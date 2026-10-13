import Link from "next/link";
import type { Movie, MovieSearchResult } from "../types/movie";
import MoviePoster from "./MoviePoster";

type MovieSearchCardProps = {
  movie: MovieSearchResult;
  details: Movie | null;
  isLoadingDetails: boolean;
};

const MovieSearchCard = ({
  movie,
  details,
  isLoadingDetails,
}: MovieSearchCardProps) => {
  const rating = Number(details?.imdbRating);
  const hasRating = Number.isFinite(rating) && rating > 0;

  return (
    <li className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-200">
          <MoviePoster src={details?.poster || movie.poster} alt={movie.name} />
        </div>

        <div className="p-4">
          <h2 className="line-clamp-2 text-lg font-semibold transition-colors hover:text-gray-600">
            {movie.name}
          </h2>

          <div className="mt-3 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {isLoadingDetails && !details ? (
                <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-500">
                  Loading rating...
                </span>
              ) : hasRating ? (
                <span className="rounded bg-yellow-400 px-2 py-1 text-sm font-bold text-gray-900">
                  IMDb {details?.imdbRating}
                </span>
              ) : (
                <span className="rounded bg-gray-200 px-2 py-1 text-sm text-gray-600">
                  Not Rated
                </span>
              )}

              <span className="text-sm text-gray-500">
                Released:{" "}
                <span className="text-gray-800">
                  {details?.year || movie.releaseInfo || "Year unknown"}
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {isLoadingDetails && !details ? (
                <span className="text-xs text-gray-500">Loading genres...</span>
              ) : details?.genres?.length ? (
                details.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {genre}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">
                  Genres unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MovieSearchCard;
