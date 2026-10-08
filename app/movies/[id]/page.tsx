import { getMovieById } from "@/app/lib/api";
import Image from "next/image";
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
        <Image
          src={movie.poster}
          alt={movie.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {movie.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-yellow-400 px-3 py-1 text-sm font-semibold text-gray-900">
            IMDb {movie.imdbRating}
          </span>

          <span className="text-sm font-medium text-gray-600">
            Released: {movie.year}
          </span>

          <span className="text-sm font-medium text-gray-600">
            Runtime: {movie.runtime}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-900">Director:</span>{" "}
            {movie.director.join(", ")}
          </p>

          <p>
            <span className="font-semibold text-gray-900">Country:</span>{" "}
            {movie.country}
          </p>

          <p>
            <span className="font-semibold text-gray-900">Runtime:</span>{" "}
            {movie.runtime}
          </p>
        </div>

        <p className="mt-6 leading-7 text-gray-600">{movie.description}</p>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900">Cast</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {movie.cast.map((actor) => (
              <span
                key={actor}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
              >
                {actor}
              </span>
            ))}
          </div>
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
