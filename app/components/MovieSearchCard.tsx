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
    <li className="group overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/20">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
          <MoviePoster src={details?.poster || movie.poster} alt={movie.name} />
        </div>

        <div className="p-4">
          <h2 className="line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
            {movie.name}
          </h2>

          <div className="mt-3 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {isLoadingDetails && !details ? (
                <span className="rounded-md border border-white/10 bg-gray-800 px-2 py-1 text-sm text-gray-400">
                  Loading rating...
                </span>
              ) : hasRating ? (
                <span className="rounded-md bg-amber-400 px-2 py-1 text-sm font-bold text-gray-950">
                  IMDb {details?.imdbRating}
                </span>
              ) : (
                <span className="rounded-md border border-white/10 bg-gray-800 px-2 py-1 text-sm text-gray-400">
                  Not Rated
                </span>
              )}

              <span className="text-sm text-gray-400">
                Released:{" "}
                <span className="text-gray-200">
                  {details?.year || movie.releaseInfo || "Year unknown"}
                </span>
              </span>
            </div>

            <div className="mt-4 flex min-h-7 flex-wrap items-start gap-2">
              {isLoadingDetails && !details ? (
                <span className="text-xs text-gray-500">Loading genres...</span>
              ) : details?.genres?.length ? (
                details.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex max-w-full items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-medium leading-5 text-amber-300"
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
