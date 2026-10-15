import Link from "next/link";

const MovieNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 text-white">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400">
          <span className="text-3xl font-bold" aria-hidden="true">
            ?
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
          Movie Not Found
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-400">
          Sorry, we couldn&apos;t find the movie you&apos;re looking for. It may
          have been removed or the ID may be invalid.
        </p>

        <Link
          href="/movies"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-gray-950 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Back to Movies
        </Link>
      </div>
    </main>
  );
};

export default MovieNotFound;
