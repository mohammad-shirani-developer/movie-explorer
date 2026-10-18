"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getPopularMovies } from "../lib/api";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import MovieCardSkeleton from "./skeletons/MovieCardSkeleton";

type MoviesContentProps = {
  movies: Movie[];
  hasMore: boolean;
};

const MoviesContent = ({ movies, hasMore }: MoviesContentProps) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [sortBy, setSortBy] = useState("default");
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
    ...Array.from(new Set(allMovies.flatMap((movie) => movie.genres))),
  ];

  const filteredMovies =
    selectedGenre === "All Genres"
      ? allMovies
      : allMovies.filter((movie) => movie.genres.includes(selectedGenre));
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "default") {
      return 0;
    }

    const ratingA = Number(a.imdbRating);
    const ratingB = Number(b.imdbRating);

    const hasRatingA =
      a.imdbRating?.trim() !== "" &&
      a.imdbRating !== "N/A" &&
      Number.isFinite(ratingA);

    const hasRatingB =
      b.imdbRating?.trim() !== "" &&
      b.imdbRating !== "N/A" &&
      Number.isFinite(ratingB);

    if (!hasRatingA && !hasRatingB) {
      return 0;
    }

    if (!hasRatingA) {
      return 1;
    }

    if (!hasRatingB) {
      return -1;
    }

    return sortBy === "rating-desc" ? ratingB - ratingA : ratingA - ratingB;
  });

  const hasActiveFilters =
    selectedGenre !== "All Genres" || sortBy !== "default";

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto w-full max-w-none px-4 py-12 sm:px-5 sm:py-16 lg:px-6">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Discover your next favorite
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Explore Movies
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
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
                  className="mb-2 block text-sm font-semibold text-gray-200"
                >
                  Filter by Genre
                </label>

                <select
                  id="genre"
                  value={selectedGenre}
                  onChange={(event) => setSelectedGenre(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
                  className="mb-2 block text-sm font-semibold text-gray-200"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
                    setSelectedGenre("All Genres");
                    setSortBy("default");
                  }}
                  className="w-full rounded-lg border border-white/10 bg-gray-900 px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-amber-400/40 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30 md:col-span-2 lg:col-span-1"
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
                      <p className="text-center text-sm text-gray-400">
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
                        className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-xl border border-white/10 bg-gray-900 px-6 py-10 text-center">
                  <h2 className="text-lg font-semibold text-white">
                    No movies found
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
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
