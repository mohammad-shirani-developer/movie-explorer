import type {
  Movie,
  MovieResponse,
  MovieSearchResponse,
  MoviesResponse,
} from "../types/movie";

const CINEMETA_BASE_URL = "https://v3-cinemeta.strem.io";

export const getPopularMovies = async (): Promise<MoviesResponse> => {
  const response = await fetch(`${CINEMETA_BASE_URL}/catalog/movie/top.json`);

  if (!response.ok) {
    throw new Error(`Cinemeta request failed: ${response.status}`);
  }

  return response.json();
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  const response = await fetch(`${CINEMETA_BASE_URL}/meta/movie/${id}.json`);

  if (!response.ok) {
    return null;
  }

  const data: MovieResponse = await response.json();

  return data.meta;
};

export const searchMovies = async (
  query: string,
): Promise<MovieSearchResponse> => {
  const url = `${CINEMETA_BASE_URL}/catalog/movie/top/search=${encodeURIComponent(query)}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Cinemeta search failed: ${response.status}`);
    }

    return response.json();
  } catch {
    const retryResponse = await fetch(url);

    if (!retryResponse.ok) {
      throw new Error(`Cinemeta search failed: ${retryResponse.status}`);
    }

    return retryResponse.json();
  }
};
