"use client";

import Link from "next/link";

import { useWatchlist } from "../lib/watchlist";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

/**
 * The watchlist screen. Entries persist in localStorage on this device, so
 * the grid renders from the client store after hydration; the empty state
 * doubles as the fallback for the brief pre-hydration frame.
 */
const WatchlistPageClient = () => {
  const { entries, isHydrated } = useWatchlist();

  // Cards need the full Movie shape; entries carry exactly the fields the
  // card renders and null for everything else.
  const movies: Movie[] = entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    description: null,
    poster: entry.poster,
    background: null,
    imdbRating: entry.imdbRating,
    genres: entry.genres,
    released: null,
    runtime: null,
    cast: null,
    director: null,
    year: entry.year,
    country: null,
  }));

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-none px-4 py-12 sm:px-5 sm:py-16 lg:px-6">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Saved for later
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            My Watchlist
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
            {isHydrated && entries.length > 0
              ? `${entries.length} ${entries.length === 1 ? "movie" : "movies"} saved on this device. Tap the bookmark on any poster to remove it.`
              : "Keep the titles you want to see in one place — saved right on this device."}
          </p>
        </header>

        {movies.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-panel">
              <svg
                className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" />
              </svg>

              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                Your watchlist is empty
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Browse the catalog and tap the bookmark icon on any poster to
                start building your list.
              </p>

              <Link
                href="/movies"
                className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
              >
                Explore Movies
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default WatchlistPageClient;
