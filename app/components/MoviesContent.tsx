"use client";

import { useState } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";

type MoviesContentProps = {
  movies: Movie[];
};

const MoviesContent = ({ movies }: MoviesContentProps) => {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div>
      <MovieSearch onSearch={setHasSearched} />

      {!hasSearched && (
        <ul className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesContent;
