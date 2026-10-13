"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { getMovieById, searchMovies } from "../lib/api";
import type { Movie, MovieSearchResult } from "../types/movie";
import MovieSearchCard from "./MovieSearchCard";

type MovieSearchProps = {
  onSearch: (hasResults: boolean) => void;
};

const MovieSearch = ({ onSearch }: MovieSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [movieDetails, setMovieDetails] = useState<
    Record<string, Movie | null>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchIdRef = useRef(0);

  const performSearch = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    const currentSearchId = ++searchIdRef.current;

    onSearch(true);
    setHasSearched(true);
    setIsLoading(true);
    setIsLoadingDetails(false);
    setError("");
    setResults([]);
    setMovieDetails({});

    try {
      const data = await searchMovies(trimmedQuery);

      // Ignore an older search response.
      if (currentSearchId !== searchIdRef.current) return;

      const movies = data.metas ?? [];
      setIsLoadingDetails(movies.length > 0);
      setResults(movies);
      setIsLoading(false);

      if (movies.length === 0) return;

      // Load details without blocking the initial search results.
      const details = await Promise.all(
        movies.map(async (movie) => ({
          id: movie.id,
          details: await getMovieById(movie.id),
        })),
      );

      // Ignore details belonging to an older search.
      if (currentSearchId !== searchIdRef.current) return;

      setMovieDetails(
        Object.fromEntries(details.map(({ id, details }) => [id, details])),
      );
    } catch (error) {
      if (currentSearchId !== searchIdRef.current) return;

      console.error("Search error:", error);
      setError("Something went wrong. Please try again.");
      setResults([]);
      setMovieDetails({});
    } finally {
      if (currentSearchId === searchIdRef.current) {
        setIsLoading(false);
        setIsLoadingDetails(false);
      }
    }
  };

  const handleSearch = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await performSearch();
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      // Invalidate pending search and details requests.
      searchIdRef.current += 1;

      setResults([]);
      setMovieDetails({});
      setError("");
      setIsLoading(false);
      setIsLoadingDetails(false);
      setHasSearched(false);
      onSearch(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex w-full gap-3">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          onChange={(event) => handleQueryChange(event.target.value)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
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
            <button
              type="button"
              onClick={() => void performSearch()}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((movie) => (
            <MovieSearchCard
              key={movie.id}
              movie={movie}
              details={movieDetails[movie.id] ?? null}
              isLoadingDetails={isLoadingDetails}
            />
          ))}
        </ul>
      )}

      {isLoadingDetails && results.length > 0 && (
        <p className="mt-4 text-sm text-gray-500" aria-live="polite">
          Loading additional movie information...
        </p>
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
