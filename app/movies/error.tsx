"use client";

import { useEffect } from "react";

type MoviesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MoviesError = ({ error, reset }: MoviesErrorProps) => {
  useEffect(() => {
    console.error("Movies page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Something went wrong
      </p>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        Unable to load movies
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
        We couldn&apos;t load the movies right now. Please try again.
      </p>

      <button
        type="button"
        onClick={() => {
          reset();
        }}
        className="mt-7 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
      >
        Try Again
      </button>
    </main>
  );
};

export default MoviesError;
