export type Movie = {
  id: string;
  name: string;
  description: string;
  poster: string;
  background: string;
  imdbRating: string;
  genres: string[];
  released: string;
  runtime: string;
  cast: string[];
  director: string[];
  year: string;
  country: string;
};

export type MoviesResponse = {
  metas: Movie[];
  hasMore: boolean;
};

export type MovieResponse = {
  meta: Movie;
};

export type MovieSearchResponse = {
  metas: MovieSearchResult[];
  hasMore: boolean;
};

export type MovieSearchResult = {
  id: string;
  name: string;
  poster: string;
  background: string;
  releaseInfo: string;
};
