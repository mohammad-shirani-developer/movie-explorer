"use client";

import { useState } from "react";
import { searchMovies } from "../lib/api";
import type { MovieSearchResult } from "../types/movie";
import MovieSearchCard from "./MovieSearchCard";

type MovieSearchProps = {
  onSearch: (hasResults: boolean) => void;
};

const MovieSearch = ({ onSearch }: MovieSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }
    onSearch(true);
    setHasSearched(true);
    setIsLoading(true);
    setError("");

    try {
      const data = await searchMovies(query);

      setResults(data.metas);
      onSearch(true);
    } catch (error) {
      console.error("Search error:", error);

      setError("Something went wrong. Please try again.");
      setResults([]);
      onSearch(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="mx-auto my-6 flex max-w-2xl gap-3"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          onChange={(event) => {
            const value = event.target.value;

            setQuery(value);

            if (!value.trim()) {
              setResults([]);
              setHasSearched(false);
              onSearch(false);
            }
          }}
        />

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />

          <p className="mt-5 text-sm font-medium text-gray-600">
            Searching for movies...
          </p>
        </div>
      )}

      {error && (
        <div className="flex min-h-[300px] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl bg-red-50 px-6 py-10 text-center">
            <h2 className="text-lg font-semibold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">
              We couldn&apos;t complete your search. Please try again.
            </p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((movie) => (
            <MovieSearchCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}

      {hasSearched && !isLoading && !error && results.length === 0 && (
        <div className="flex min-h-[300px] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl bg-gray-50 px-6 py-10 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No movies found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We couldn&apos;t find any movies matching your search. Try a
              different title or keyword.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
