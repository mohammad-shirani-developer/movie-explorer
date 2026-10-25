import type {
  Movie,
  MovieResponse,
  MovieSearchResponse,
  MoviesResponse,
} from "../types/movie";

// Can be overridden with the CINEMETA_BASE_URL environment variable.
const CINEMETA_BASE_URL =
  process.env.CINEMETA_BASE_URL?.trim() || "https://v3-cinemeta.strem.io";

const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 10_000;
const RETRY_BASE_DELAY_MS = 500;

export class CinemetaHttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Cinemeta request failed: ${status}`);
    this.name = "CinemetaHttpError";
    this.status = status;
  }
}

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Combines the per-request timeout signal with an optional caller signal.
 * AbortSignal.any is only available on modern browsers (Chrome 116+,
 * Safari 17.4+, Firefox 124+); on older ones the client-side calls
 * (infinite scroll, search) used to throw before even reaching the
 * network, so a tiny forwarding controller keeps them working.
 */
const combineSignals = (
  timeoutSignal: AbortSignal,
  callerSignal?: AbortSignal,
): AbortSignal => {
  if (!callerSignal) {
    return timeoutSignal;
  }

  if (typeof AbortSignal.any === "function") {
    return AbortSignal.any([timeoutSignal, callerSignal]);
  }

  const controller = new AbortController();
  const abort = () => controller.abort();

  if (callerSignal.aborted || timeoutSignal.aborted) {
    abort();
  }

  callerSignal.addEventListener("abort", abort, { once: true });
  timeoutSignal.addEventListener("abort", abort, { once: true });

  return controller.signal;
};

/**
 * Fetches a Cinemeta endpoint with a timeout and automatic retries.
 * Network failures and 5xx responses are retried; other HTTP errors
 * (404, 400, ...) fail immediately with a CinemetaHttpError.
 * An optional caller signal cancels the request without retries.
 */
const fetchCinemetaJson = async <T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> => {
  const url = `${CINEMETA_BASE_URL}${path}`;
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const requestSignal = combineSignals(timeoutSignal, signal);

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, { signal: requestSignal });

      if (!response.ok) {
        const httpError = new CinemetaHttpError(response.status);

        // Only server-side failures are worth retrying.
        if (response.status >= 500 && attempt < MAX_ATTEMPTS - 1) {
          lastError = httpError;
          await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
          continue;
        }

        throw httpError;
      }

      return (await response.json()) as T;
    } catch (error) {
      // HTTP errors that were not scheduled for a retry fail immediately.
      if (error instanceof CinemetaHttpError) {
        throw error;
      }

      // A caller-initiated cancellation is never retried.
      if (signal?.aborted) {
        throw error;
      }

      lastError = error;

      if (attempt < MAX_ATTEMPTS - 1) {
        await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
      }
    }
  }

  throw lastError;
};

export const getPopularMovies = async (
  skip = 0,
  signal?: AbortSignal,
): Promise<MoviesResponse> => {
  const path = `/catalog/movie/top${skip > 0 ? `/skip=${skip}` : ""}.json`;
  const data = await fetchCinemetaJson<MoviesResponse>(path, signal);

  // Never trust the payload shape blindly: a malformed response must
  // degrade to an empty list instead of crashing the render tree.
  return {
    metas: Array.isArray(data.metas) ? data.metas : [],
    hasMore: Boolean(data.hasMore),
  };
};

export const getMovieById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Movie | null> => {
  try {
    const data = await fetchCinemetaJson<MovieResponse>(
      `/meta/movie/${encodeURIComponent(id)}.json`,
      signal,
    );

    const meta = data.meta;

    /* A 200 with an unusable body (empty meta, no id/name) must degrade to
       "not found" instead of rendering a broken detail page. */
    if (
      !meta ||
      typeof meta.id !== "string" ||
      meta.id.trim() === "" ||
      typeof meta.name !== "string" ||
      meta.name.trim() === ""
    ) {
      return null;
    }

    return meta;
  } catch (error) {
    if (error instanceof CinemetaHttpError && error.status === 404) {
      return null;
    }

    throw error;
  }
};

export const searchMovies = async (
  query: string,
  signal?: AbortSignal,
): Promise<MovieSearchResponse> => {
  const path = `/catalog/movie/top/search=${encodeURIComponent(query)}.json`;
  const data = await fetchCinemetaJson<MovieSearchResponse>(path, signal);

  return {
    metas: Array.isArray(data.metas) ? data.metas : [],
    hasMore: Boolean(data.hasMore),
  };
};
