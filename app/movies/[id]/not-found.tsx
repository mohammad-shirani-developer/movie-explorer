import Link from "next/link";

const MovieNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-panel">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand">
          <span className="text-3xl font-bold" aria-hidden="true">
            ?
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Movie Not Found
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          Sorry, we couldn&apos;t find the movie you&apos;re looking for. It may
          have been removed or the ID may be invalid.
        </p>

        <Link
          href="/movies"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
        >
          Back to Movies
        </Link>
      </div>
    </main>
  );
};

export default MovieNotFound;
