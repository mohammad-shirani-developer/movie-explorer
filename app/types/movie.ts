export type Movie = {
  id: string;
  name: string;
  description: string | null;
  poster: string | null;
  background: string | null;
  imdbRating: string | null;
  genres: string[] | null;
  released: string | null;
  runtime: string | null;
  cast: string[] | null;
  director: string[] | null;
  year: string | null;
  country: string | null;
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
  poster: string | null;
  background: string | null;
  releaseInfo: string | null;
};
