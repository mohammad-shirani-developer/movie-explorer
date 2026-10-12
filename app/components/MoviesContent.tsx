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
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  const genres = [
    "All Genres",
    ...Array.from(new Set(movies.flatMap((movie) => movie.genres))),
  ];

  const filteredMovies =
    selectedGenre === "All Genres"
      ? movies
      : movies.filter((movie) => movie.genres.includes(selectedGenre));

  return (
    <div>
      <div className="mb-6 mt-6 flex flex-col gap-4 px-4 sm:flex-row sm:items-end lg:px-8">
        {!hasSearched && (
          <div className="w-full sm:max-w-xs">
            <label
              htmlFor="genre"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Filter by Genre
            </label>

            <select
              id="genre"
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="w-full flex-1">
          <MovieSearch onSearch={setHasSearched} />
        </div>
      </div>

      {!hasSearched && (
        <>
          <p className="mb-4 px-4 text-sm text-gray-500 lg:px-8">
            Showing {filteredMovies.length} movies
            {selectedGenre !== "All Genres" && ` in ${selectedGenre}`}
          </p>
          {filteredMovies.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center px-4">
              <div className="w-full max-w-md px-6 py-10 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No movies found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  There are no movies available in this genre. Try selecting
                  another genre.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesContent;
