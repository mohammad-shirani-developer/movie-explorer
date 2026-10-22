import Link from "next/link";

const MovieNotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Nothing here
      </p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
        Movie Not Found
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
        Sorry, we couldn&apos;t find the movie you&apos;re looking for.
      </p>

      <Link
        href="/"
        className="mt-7 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default MovieNotFound;
