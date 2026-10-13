import Link from "next/link";
import type { Movie } from "../types/movie";
import MoviePoster from "./MoviePoster";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <li className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-200">
          <MoviePoster src={movie.poster} alt={movie.name} />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/movies/${movie.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold transition-colors hover:text-gray-600">
            {movie.name}
          </h2>
        </Link>

        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <p
              className={`inline-block rounded-md px-2 py-1 text-sm font-semibold ${
                movie.imdbRating &&
                movie.imdbRating !== "N/A" &&
                Number.isFinite(Number(movie.imdbRating))
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {movie.imdbRating &&
              movie.imdbRating !== "N/A" &&
              Number.isFinite(Number(movie.imdbRating))
                ? `IMDb ${movie.imdbRating}`
                : "Not Rated"}
            </p>

            <p className="text-sm font-medium text-gray-500">
              Released: <span className="text-gray-800">{movie.year}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
