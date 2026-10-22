import Link from "next/link";
import { getHomeCatalog } from "../lib/home-catalog";
import MovieCard from "./MovieCard";
import RetryButton from "./RetryButton";

const FEATURED_START = 11;
const FEATURED_END = 19;

const FeaturedMovies = async () => {
  const catalog = await getHomeCatalog();

  if (!catalog) {
    return (
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Unable to load featured movies
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Something went wrong while loading movies. Please try again later.
        </p>
        <RetryButton />
      </section>
    );
  }

  const featuredMovies = catalog.metas.slice(FEATURED_START, FEATURED_END);

  if (featuredMovies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Handpicked for you
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Featured Movies
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Discover something great to watch next.
            </p>
          </div>

          <Link
            href="/movies"
            className="shrink-0 text-sm font-semibold text-brand transition hover:text-brand-bright"
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedMovies;
