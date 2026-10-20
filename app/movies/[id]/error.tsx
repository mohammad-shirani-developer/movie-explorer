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
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 text-white">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-red-400">
          <span className="text-3xl font-bold" aria-hidden="true">
            !
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-400">
          We couldn&apos;t load this movie. Please check your connection and try
          again.
        </p>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-gray-950 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default MovieDetailsError;
