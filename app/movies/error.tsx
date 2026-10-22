"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

type MoviesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MoviesError = ({ error, reset }: MoviesErrorProps) => {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();

  useEffect(() => {
    console.error("Movies page error:", error);
  }, [error]);

  const handleRetry = () => {
    startRetry(() => {
      // refetch the failed server payload, then clear the error boundary
      router.refresh();
      reset();
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Something went wrong
      </p>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        Unable to load movies
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
        We couldn&apos;t reach the movie service. Please check your internet
        connection and try again.
      </p>

      <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-ink"
        >
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>

        <Link
          href="/"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-brand/40 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 dark:border-white/10 dark:bg-panel dark:text-gray-300 dark:hover:border-brand/40 dark:hover:text-white"
        >
          Go to Home
        </Link>
      </div>

      <p className="mt-4 h-5 text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {isRetrying ? "Reconnecting to the movie service..." : ""}
      </p>
    </main>
  );
};

export default MoviesError;
