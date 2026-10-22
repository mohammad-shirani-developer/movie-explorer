"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

type MovieDetailsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MovieDetailsError = ({ error, reset }: MovieDetailsErrorProps) => {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();

  useEffect(() => {
    console.error("Movie details error:", error);
  }, [error]);

  const handleRetry = () => {
    startRetry(() => {
      // refetch the failed server payload, then clear the error boundary
      router.refresh();
      reset();
    });
  };

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
          We couldn&apos;t load this movie. Please check your connection and
          try again.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-ink"
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-brand/40 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 dark:border-white/10 dark:bg-panel dark:text-gray-300 dark:hover:border-brand/40 dark:hover:text-white"
          >
            Go to Home
          </Link>
        </div>

        <p
          className="mt-4 h-5 text-sm text-gray-500 dark:text-gray-400"
          aria-live="polite"
        >
          {isRetrying ? "Reconnecting to the movie service..." : ""}
        </p>
      </div>
    </main>
  );
};

export default MovieDetailsError;
