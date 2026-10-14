import Link from "next/link";

const MovieNotFound = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <span className="text-3xl font-bold" aria-hidden="true">
            ?
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Movie Not Found
        </h1>

        <p className="mt-3 leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the movie you&apos;re looking for. It may
          have been removed or the ID may be invalid.
        </p>

        <Link
          href="/movies"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Back to Movies
        </Link>
      </div>
    </main>
  );
};

export default MovieNotFound;
