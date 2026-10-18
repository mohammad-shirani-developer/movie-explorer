import Link from "next/link";
import { getPopularMovies } from "../lib/api";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import RetryButton from "./RetryButton";

const FeaturedMovies = async () => {
  let featuredMovies: Movie[];

  try {
    const data = await getPopularMovies();
    featuredMovies = data.metas.slice(0, 4);
  } catch {
    return (
      <section className="border-t border-white/10 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-white">
          Unable to load featured movies
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Something went wrong while loading movies. Please try again later.
        </p>
        <RetryButton />
      </section>
    );
  }

  return (
    <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Handpicked for you
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Featured Movies
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Discover something great to watch next.
            </p>
          </div>

          <Link
            href="/movies"
            className="shrink-0 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
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
