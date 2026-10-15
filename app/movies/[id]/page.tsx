import MoviePoster from "@/app/components/MoviePoster";
import { getMovieById } from "@/app/lib/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const MovieDetailsContent = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
        <div className="group relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl shadow-black/30 lg:mx-0">
          <MoviePoster src={movie.poster} alt={movie.name} />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {movie.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p
              className={`"inline-flex items-center rounded-md px-3 py-1.5 text-sm font-bold" ${
                movie.imdbRating &&
                movie.imdbRating !== "N/A" &&
                Number.isFinite(Number(movie.imdbRating))
                  ? "bg-amber-400 text-gray-950"
                  : "border border-white/10 bg-gray-800 text-gray-400"
              }`}
            >
              {movie.imdbRating &&
              movie.imdbRating !== "N/A" &&
              Number.isFinite(Number(movie.imdbRating))
                ? `IMDb ${movie.imdbRating}`
                : "Not Rated"}
            </p>

            <span className="text-sm font-medium text-gray-400">
              Released:{" "}
              {movie.year && movie.year !== "N/A"
                ? movie.year
                : "Not Available"}
            </span>

            {movie.runtime?.trim() && movie.runtime !== "N/A" && (
              <span className="text-sm font-medium text-gray-400">
                Runtime: {movie.runtime}
              </span>
            )}
          </div>
          <div className="mt-5 min-h-7">
            {movie.genres?.some((genre) => genre.trim()) && (
              <div className="flex flex-wrap gap-2">
                {movie.genres
                  .filter((genre) => genre.trim())
                  .map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-6 space-y-3 text-sm leading-6 text-gray-300">
            <p>
              <span className="font-semibold text-gray-400">Director:</span>{" "}
              {movie.director?.filter((name) => name.trim()).join(", ") ||
                "Not Available"}
            </p>

            <div className="min-h-5">
              {movie.country?.trim() && (
                <p>
                  <span className="font-semibold text-gray-400">Country:</span>{" "}
                  {movie.country}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 min-h-7">
            {movie.description?.trim() && (
              <p className="text-sm leading-8 text-gray-300">
                {movie.description}
              </p>
            )}
          </div>

          <div className="mt-4 min-h-7">
            {movie.cast?.some((actor) => actor.trim()) && (
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Cast
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.cast
                    .filter((actor) => actor.trim())
                    .map((actor) => (
                      <span
                        key={actor}
                        className="inline-flex items-center rounded-full border border-white/10 bg-gray-900 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:border-amber-400/30 hover:text-amber-300"
                      >
                        {actor}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const MovieDetailsPage = ({ params }: MovieDetailsPageProps) => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
          <div
            className="mx-auto flex min-h-[300px] w-full max-w-7xl flex-col items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-amber-400"
              aria-hidden="true"
            />
            <p className="mt-5 text-sm font-medium text-gray-400">
              Loading movie details...
            </p>
          </div>
        </main>
      }
    >
      <MovieDetailsContent params={params} />
    </Suspense>
  );
};

export default MovieDetailsPage;
