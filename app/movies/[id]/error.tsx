"use client";

import { useEffect } from "react";

type MovieDetailsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MovieDetailsError = ({ error, reset }: MovieDetailsErrorProps) => {
  useEffect(() => {
    console.error("Movie details error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-panel">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400">
          <span className="text-3xl font-bold" aria-hidden="true">
            !
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          We couldn&apos;t load this movie. Please check your connection and try
          again.
        </p>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default MovieDetailsError;
