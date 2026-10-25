"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPopularMovies } from "../lib/api";
import { parseImdbRating } from "../lib/movie-utils";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import MovieCardSkeleton from "./skeletons/MovieCardSkeleton";

type MoviesContentProps = {
  movies: Movie[];
  hasMore: boolean;
};

const DEFAULT_GENRE = "All Genres";
const DEFAULT_SORT = "default";
const VALID_SORTS = ["default", "rating-desc", "rating-asc"] as const;

const MoviesContent = ({ movies, hasMore }: MoviesContentProps) => {
  const [hasSearched, setHasSearched] = useState(false);

  /* URL-driven filters: genre and sort live in the query string
     (?genre=Action&sort=rating-desc) so any filtered view is a shareable,
     bookmarkable URL. The initial values come from useSearchParams — the
     server reads the same request URL, so the SSR markup always matches the
     hydration render. */
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") ?? DEFAULT_GENRE;
  const initialSort = VALID_SORTS.includes(
    searchParams.get("sort") as (typeof VALID_SORTS)[number],
  )
    ? (searchParams.get("sort") as string)
    : DEFAULT_SORT;

  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState(initialSort);

  /* replaceState (not router.push): filtering should update the shareable
     URL without pushing a history entry per drag of the select and without
     re-running the server component for a client-side transformation. */
  const syncFiltersToUrl = useCallback((genre: string, sort: string) => {
    const params = new URLSearchParams();

    if (genre !== DEFAULT_GENRE) {
      params.set("genre", genre);
    }

    if (sort !== DEFAULT_SORT) {
      params.set("sort", sort);
    }

    const query = params.toString();
    window.history.replaceState(null, "", query ? `/movies?${query}` : "/movies");
  }, []);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    syncFiltersToUrl(genre, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    syncFiltersToUrl(selectedGenre, sort);
  };
  const [allMovies, setAllMovies] = useState(movies);
  const [hasMoreMovies, setHasMoreMovies] = useState(hasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const isLoadingRef = useRef(false);
  const nextSkipRef = useRef(movies.length);

  const loadMoreMovies = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreMovies) {
      return;
    }
    setLoadMoreError(false);
    isLoadingRef.current = true;
    setIsLoadingMore(true);

    try {
      const nextData = await getPopularMovies(nextSkipRef.current);

      nextSkipRef.current += nextData.metas.length;

      setAllMovies((currentMovies) => {
        const existingIds = new Set(currentMovies.map((movie) => movie.id));

        const newMovies = nextData.metas.filter(
          (movie) => !existingIds.has(movie.id),
        );

        return [...currentMovies, ...newMovies];
      });

      setHasMoreMovies(nextData.hasMore);
    } catch (error) {
      console.error("Failed to load more movies:", error);
      setLoadMoreError(true);
    } finally {
      isLoadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasMoreMovies]);

  useEffect(() => {
    if (hasSearched || !hasMoreMovies) {
      return;
    }

    const target = observerTarget.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMoreMovies();
        }
      },
      {
        rootMargin: "1500px 0px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasSearched, hasMoreMovies, loadMoreMovies, allMovies.length]);

  const genres = [
    "All Genres",
    ...Array.from(
      new Set(
        allMovies.flatMap(
          (movie) => movie.genres?.filter((genre) => genre.trim()) ?? [],
        ),
      ),
    ),
  ];

  const filteredMovies =
    selectedGenre === "All Genres"
      ? allMovies
      : allMovies.filter((movie) => movie.genres?.includes(selectedGenre));
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "default") {
      return 0;
    }

    // Unrated titles always sort below rated ones in both directions.
    const ratingA = parseImdbRating(a.imdbRating);
    const ratingB = parseImdbRating(b.imdbRating);

    if (ratingA === null && ratingB === null) {
      return 0;
    }

    if (ratingA === null) {
      return 1;
    }

    if (ratingB === null) {
      return -1;
    }

    return sortBy === "rating-desc" ? ratingB - ratingA : ratingA - ratingB;
  });

  const hasActiveFilters =
    selectedGenre !== DEFAULT_GENRE || sortBy !== DEFAULT_SORT;

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-none px-4 py-12 sm:px-5 sm:py-16 lg:px-6">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Discover your next favorite
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Explore Movies
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
            Browse movies, explore different genres, and find your next favorite
            film.
          </p>
        </header>
        <div className="mb-6 mt-6 grid grid-cols-1 items-end gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
          {!hasSearched && (
            <>
              <div className="min-w-0 w-full">
                <label
                  htmlFor="genre"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Filter by Genre
                </label>

                <select
                  id="genre"
                  value={selectedGenre}
                  onChange={(event) => handleGenreChange(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-white/10 dark:bg-panel dark:text-white"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:max-w-xs">
                <label
                  htmlFor="sort"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => handleSortChange(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-white/10 dark:bg-panel dark:text-white"
                >
                  <option value="default">Default</option>
                  <option value="rating-desc">Highest IMDb Rating</option>
                  <option value="rating-asc">Lowest IMDb Rating</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre(DEFAULT_GENRE);
                    setSortBy(DEFAULT_SORT);
                    syncFiltersToUrl(DEFAULT_GENRE, DEFAULT_SORT);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-brand/40 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 md:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-panel dark:text-gray-300 dark:hover:bg-panel-soft dark:hover:text-white"
                >
                  Reset Filters
                </button>
              )}
            </>
          )}

          <div
            className={`min-w-0 w-full ${
              hasSearched
                ? "md:col-span-2 lg:col-span-3 xl:col-span-4"
                : "md:col-span-2 lg:col-span-1 xl:col-span-1"
            }`}
          >
            <MovieSearch onSearch={setHasSearched} />
          </div>
        </div>

        {!hasSearched && (
          <>
            <p className="mb-4 px-4 text-sm text-gray-500 lg:px-8">
              {filteredMovies.length} movies loaded
              {selectedGenre !== "All Genres" && ` in ${selectedGenre}`}
            </p>
            {filteredMovies.length > 0 ? (
              <>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
                  {sortedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>

                <div ref={observerTarget} className="h-10" aria-hidden="true" />
                <div
                  className="flex min-h-10 items-center justify-center"
                  aria-live="polite"
                >
                  {isLoadingMore && (
                    <div className="w-full space-y-4 py-4" aria-busy="true">
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Loading more movies...
                      </p>

                      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
                        {Array.from({ length: 4 }, (_, index) => (
                          <MovieCardSkeleton key={index} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {loadMoreError && !isLoadingMore && (
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-red-400">
                        Failed to load more movies.
                      </p>

                      <button
                        type="button"
                        onClick={() => void loadMoreMovies()}
                        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-panel">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    No movies found
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    There are no movies available in this genre. Try selecting
                    another genre.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default MoviesContent;
