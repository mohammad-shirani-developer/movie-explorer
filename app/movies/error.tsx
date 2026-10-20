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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
        Something went wrong
      </p>

      <h1 className="mt-4 text-3xl font-bold">Unable to load movies</h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
        We couldn&apos;t load the movies right now. Please try again.
      </p>

      <button
        type="button"
        onClick={() => {
          reset();
        }}
        className="mt-7 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-gray-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
      >
        Try Again
      </button>
    </main>
  );
};

export default MoviesError;
