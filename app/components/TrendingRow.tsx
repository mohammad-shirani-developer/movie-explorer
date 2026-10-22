import Link from "next/link";
import { getPopularMovies } from "../lib/api";
import type { Movie } from "../types/movie";
import MoviePoster from "./MoviePoster";

const TrendingRow = async () => {
  let movies: Movie[] = [];

  try {
    const data = await getPopularMovies();

    movies = data.metas.slice(1, 11);
  } catch {
    movies = [];
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-200/70 py-12 sm:py-14 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Top of the charts
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Trending Now
            </h2>
          </div>

          <Link
            href="/movies"
            className="shrink-0 text-sm font-semibold text-brand transition hover:text-brand-bright"
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="scrollbar-hide -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-5 sm:px-6">
          {movies.map((movie, index) => (
            <li key={movie.id} className="w-36 shrink-0 snap-start sm:w-44">
              <Link href={`/movies/${movie.id}`} className="group block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand/40 group-hover:shadow-xl group-hover:shadow-gray-900/10 dark:border-white/10 dark:bg-panel-soft dark:group-hover:shadow-black/40">
                  <MoviePoster src={movie.poster} alt={movie.name} />

                  <span className="absolute left-2 top-2 rounded-md bg-gray-950/70 px-1.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                    #{index + 2}
                  </span>
                </div>

                <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand dark:text-white">
                  {movie.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingRow;
