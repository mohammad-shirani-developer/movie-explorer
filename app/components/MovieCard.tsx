import Link from "next/link";
import type { Movie } from "../types/movie";
import MoviePoster from "./MoviePoster";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  const rating = Number(movie.imdbRating);
  const hasRating =
    movie.imdbRating?.trim() !== "" &&
    movie.imdbRating !== "N/A" &&
    Number.isFinite(rating);
  return (
    <li className="overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-black/20">
      <Link href={`/movies/${movie.id}`}>
        <div className="group relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
          <MoviePoster src={movie.poster} alt={movie.name} />
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <Link href={`/movies/${movie.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-white transition-colors hover:text-amber-400">
            {movie.name}
          </h2>
        </Link>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center  gap-x-3 gap-y-2">
            <p
              className={`inline-block rounded-md px-2 py-1 text-sm font-semibold ${
                hasRating
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {hasRating ? `IMDb ${movie.imdbRating}` : "Not Rated"}
            </p>

            <p className="text-sm font-medium text-gray-400">
              Released:{" "}
              <span className="text-gray-200">
                {movie.year?.trim() || "Year unknown"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.length > 0 ? (
              movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">Genres unavailable</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
