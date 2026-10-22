import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        404 - Page Not Found
      </p>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
        This page doesn&apos;t exist
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
        The page you&apos;re looking for may have been moved or doesn&apos;t
        exist.
      </p>

      <Link
        href="/movies"
        className="mt-7 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
      >
        Back to Movies
      </Link>
    </main>
  );
};

export default NotFound;
