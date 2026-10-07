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
};

export type MoviesResponse = {
  metas: Movie[];
  hasMore: boolean;
};
