import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <li className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={movie.poster}
          alt={movie.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <Link href={`/movies/${movie.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold transition-colors hover:text-gray-600">
            {movie.name}
          </h2>
        </Link>

        <div className="mt-3 space-y-3">
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3">
              <p className="inline-block rounded-md bg-yellow-400 px-2 py-1 text-sm font-semibold text-gray-900">
                IMDb {movie.imdbRating}
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
      </div>
    </li>
  );
};

export default MovieCard;
