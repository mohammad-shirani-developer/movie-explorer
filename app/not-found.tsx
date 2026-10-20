import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
        404 - Page Not Found
      </p>

      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
        This page doesn&apos;t exist
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
        The page you&apos;re looking for may have been moved or doesn&apos;t
        exist.
      </p>

      <Link
        href="/movies"
        className="mt-7 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-gray-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
      >
        Back to Movies
      </Link>
    </main>
  );
};

export default NotFound;
