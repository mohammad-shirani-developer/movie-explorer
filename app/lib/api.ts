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
 * Fetches a Cinemeta endpoint with a timeout and automatic retries.
 * Network failures and 5xx responses are retried; other HTTP errors
 * (404, 400, ...) fail immediately with a CinemetaHttpError.
 */
const fetchCinemetaJson = async <T>(path: string): Promise<T> => {
  const url = `${CINEMETA_BASE_URL}${path}`;

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

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

      lastError = error;

      if (attempt < MAX_ATTEMPTS - 1) {
        await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
      }
    }
  }

  throw lastError;
};

export const getPopularMovies = async (skip = 0): Promise<MoviesResponse> => {
  const path = `/catalog/movie/top${skip > 0 ? `/skip=${skip}` : ""}.json`;

  return fetchCinemetaJson<MoviesResponse>(path);
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  try {
    const data = await fetchCinemetaJson<MovieResponse>(`/meta/movie/${id}.json`);

    return data.meta ?? null;
  } catch (error) {
    if (error instanceof CinemetaHttpError && error.status === 404) {
      return null;
    }

    throw error;
  }
};

export const searchMovies = async (
  query: string,
): Promise<MovieSearchResponse> => {
  const path = `/catalog/movie/top/search=${encodeURIComponent(query)}.json`;

  return fetchCinemetaJson<MovieSearchResponse>(path);
};
