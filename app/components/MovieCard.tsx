import Link from "next/link";
import { parseImdbRating } from "../lib/movie-utils";
import type { Movie } from "../types/movie";
import MoviePoster from "./MoviePoster";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  const hasRating = parseImdbRating(movie.imdbRating) !== null;

  const genres = movie.genres?.filter((genre) => genre.trim()) ?? [];
  return (
    <li className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-gray-900/10 dark:border-white/10 dark:bg-panel dark:hover:shadow-black/40">
      <Link href={`/movies/${movie.id}`}>
        <div className="group relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-panel-soft">
          <MoviePoster src={movie.poster} alt={movie.name} />
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <Link href={`/movies/${movie.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors hover:text-brand dark:text-white">
            {movie.name}
          </h2>
        </Link>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p
              className={`inline-block rounded-md px-2 py-1 text-sm font-semibold ${
                hasRating
                  ? "bg-yellow-400 text-gray-950"
                  : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
              }`}
            >
              {hasRating ? `IMDb ${movie.imdbRating}` : "Not Rated"}
            </p>

            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Released:{" "}
              <span className="text-gray-800 dark:text-gray-200">
                {movie.year?.trim() || "Year unknown"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.length > 0 ? (
              genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Genres unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
