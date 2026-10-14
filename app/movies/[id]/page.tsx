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
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 p-4 md:grid-cols-2">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl shadow-md">
        <MoviePoster src={movie.poster} alt={movie.name} />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {movie.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
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

          <span className="text-sm font-medium text-gray-600">
            Released:{" "}
            {movie.year && movie.year !== "N/A" ? movie.year : "Not Available"}
          </span>

          {movie.runtime?.trim() && movie.runtime !== "N/A" && (
            <span className="text-sm font-medium text-gray-600">
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
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          )}
        </div>
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-900">Director:</span>{" "}
            {movie.director?.filter((name) => name.trim()).join(", ") ||
              "Not Available"}
          </p>

          <div className="min-h-5">
            {movie.country?.trim() && (
              <p>
                <span className="font-semibold text-gray-900">Country:</span>{" "}
                {movie.country}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 min-h-7">
          {movie.description?.trim() && (
            <p className="leading-7 text-gray-600">{movie.description}</p>
          )}
        </div>

        <div className="mt-4 min-h-7">
          {movie.cast?.some((actor) => actor.trim()) && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">Cast</h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {movie.cast
                  .filter((actor) => actor.trim())
                  .map((actor) => (
                    <span
                      key={actor}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {actor}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const MovieDetailsPage = ({ params }: MovieDetailsPageProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MovieDetailsContent params={params} />
    </Suspense>
  );
};

export default MovieDetailsPage;
