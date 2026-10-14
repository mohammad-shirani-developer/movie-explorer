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
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <span className="text-3xl font-bold" aria-hidden="true">
            !
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 leading-7 text-gray-600">
          We couldn&apos;t load this movie. Please check your connection and try
          again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default MovieDetailsError;
