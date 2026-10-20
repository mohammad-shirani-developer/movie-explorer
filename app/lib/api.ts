import type {
  Movie,
  MovieResponse,
  MovieSearchResponse,
  MoviesResponse,
} from "../types/movie";

const CINEMETA_BASE_URL = "https://v3-cinemeta.strem.io";

export const getPopularMovies = async (skip = 0): Promise<MoviesResponse> => {
  const url = `${CINEMETA_BASE_URL}/catalog/movie/top${skip > 0 ? `/skip=${skip}` : ""}.json`;

  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Cinemeta request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError;
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  const response = await fetch(`${CINEMETA_BASE_URL}/meta/movie/${id}.json`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  const data: MovieResponse = await response.json();

  return data.meta ?? null;
};

export const searchMovies = async (
  query: string,
): Promise<MovieSearchResponse> => {
  const url = `${CINEMETA_BASE_URL}/catalog/movie/top/search=${encodeURIComponent(query)}.json`;

  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Cinemeta search failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError;
};
