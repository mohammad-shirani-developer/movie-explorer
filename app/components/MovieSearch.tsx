"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getMovieById, searchMovies } from "../lib/api";
import type { Movie, MovieSearchResult } from "../types/movie";
import MovieSearchCard from "./MovieSearchCard";
import MovieSearchCardSkeleton from "./skeletons/MovieSearchCardSkeleton";

type MovieSearchProps = {
  onSearch: (hasResults: boolean) => void;
};

// Cinemeta search catalogs can return up to 100 metas; fetching the details
// of every one of them fires ~100 requests per search. Capping the grid
// keeps the request storm bounded with no practical UX loss.
const SEARCH_RESULTS_LIMIT = 24;

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
  const searchAbortRef = useRef<AbortController | null>(null);

  // Cancel any in-flight search when the component unmounts.
  useEffect(() => {
    return () => searchAbortRef.current?.abort();
  }, []);

  const performSearch = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    const currentSearchId = ++searchIdRef.current;

    // Supersede the previous search: its requests are aborted so stale
    // responses can neither overwrite fresh ones nor keep burning bandwidth.
    searchAbortRef.current?.abort();
    const abortController = new AbortController();
    searchAbortRef.current = abortController;

    onSearch(true);
    setHasSearched(true);
    setIsLoading(true);
    setIsLoadingDetails(false);
    setError("");
    setResults([]);
    setMovieDetails({});

    try {
      const data = await searchMovies(trimmedQuery, abortController.signal);

      // Ignore results from a previous search if a newer search has started.
      if (currentSearchId !== searchIdRef.current) return;

      const movies = data.metas.slice(0, SEARCH_RESULTS_LIMIT);
      setIsLoadingDetails(movies.length > 0);
      setResults(movies);
      setIsLoading(false);

      if (movies.length === 0) return;

      // Load details without blocking the initial search results.

      const details = await Promise.all(
        movies.map(async (movie) => {
          try {
            return {
              id: movie.id,
              details: await getMovieById(movie.id, abortController.signal),
            };
          } catch (error) {
            // A superseded search drops its cancelled details silently.
            if (abortController.signal.aborted) {
              return { id: movie.id, details: null };
            }

            console.error(
              `Failed to load details for movie ${movie.id}:`,
              error,
            );

            return {
              id: movie.id,
              details: null,
            };
          }
        }),
      );

      // Ignore movie details if a newer search has started.
      if (
        currentSearchId !== searchIdRef.current ||
        abortController.signal.aborted
      ) {
        return;
      }

      setMovieDetails(
        Object.fromEntries(details.map(({ id, details }) => [id, details])),
      );
    } catch (error) {
      if (
        currentSearchId !== searchIdRef.current ||
        abortController.signal.aborted
      ) {
        return;
      }

      console.error("Search error:", error);
      setError("Something went wrong. Please try again.");
      setResults([]);
      setMovieDetails({});
    } finally {
      if (
        currentSearchId === searchIdRef.current &&
        !abortController.signal.aborted
      ) {
        setIsLoading(false);
        setIsLoadingDetails(false);
      }
    }
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await performSearch();
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      // Invalidate pending requests so cleared search results cannot reappear.
      searchIdRef.current += 1;
      searchAbortRef.current?.abort();

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
          className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-white/10 dark:bg-panel dark:text-white"
          onChange={(event) => handleQueryChange(event.target.value)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-ink"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="mt-6 space-y-4" aria-busy="true">
          <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Searching for movies...
          </p>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <MovieSearchCardSkeleton key={index} />
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="flex min-h-[300px] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-400/20 dark:bg-panel">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              We couldn&apos;t complete your search. Please try again.
            </p>
            <button
              type="button"
              onClick={() => void performSearch()}
              className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
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
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-panel">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              No movies found
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
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
