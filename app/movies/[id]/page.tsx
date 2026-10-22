import Image from "next/image";
import MoviePoster from "@/app/components/MoviePoster";
import MovieDetailsSkeleton from "@/app/components/skeletons/MovieDetailsSkeleton";
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

  const rating = Number(movie.imdbRating);

  const hasRating =
    movie.imdbRating?.trim() !== "" &&
    movie.imdbRating !== "N/A" &&
    Number.isFinite(rating);

  const genres = movie.genres?.filter((genre) => genre.trim()) ?? [];
  const cast = movie.cast?.filter((actor) => actor.trim()) ?? [];
  const directors = movie.director?.filter((name) => name.trim()) ?? [];

  const hasBackdrop = Boolean(movie.background?.trim());
  const backdrop = hasBackdrop ? movie.background : movie.poster;
  const country = movie.country?.trim() && movie.country !== "N/A" ? movie.country : null;
  const runtime =
    movie.runtime?.trim() && movie.runtime !== "N/A" ? movie.runtime : null;

  return (
    <main className="min-h-screen">
      {/* Cinematic backdrop banner */}
      <section className="relative h-[420px] overflow-hidden sm:h-[480px]">
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover ${hasBackdrop ? "" : "scale-110 blur-lg"}`}
        />

        {/* Fade the backdrop into the page background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/5 dark:from-ink dark:via-ink/70 dark:to-ink/5"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent dark:from-ink/60"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
              Movie Detail
            </p>

            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm sm:text-5xl dark:text-white">
              {movie.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {hasRating ? (
                <span className="rounded-md bg-yellow-400 px-2 py-1 text-sm font-bold text-gray-950">
                  IMDb {movie.imdbRating}
                </span>
              ) : (
                <span className="rounded-md border border-gray-300 bg-white/60 px-2 py-1 text-sm font-semibold text-gray-600 backdrop-blur-sm dark:border-white/15 dark:bg-white/10 dark:text-gray-400">
                  Not Rated
                </span>
              )}

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Released:{" "}
                {movie.year && movie.year !== "N/A"
                  ? movie.year
                  : "Not Available"}
              </span>

              {runtime && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Runtime: {runtime}
                </span>
              )}

              {country && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country: {country}
                </span>
              )}
            </div>

            {genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Poster + storyline */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12 lg:px-8">
        <div className="group relative mx-auto aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-900/10 md:-mt-28 md:mx-0 dark:border-white/10 dark:bg-panel-soft dark:shadow-black/50">
          <MoviePoster src={movie.poster} alt={movie.name} />
        </div>

        <div>
          {movie.description?.trim() && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Storyline
              </h2>
              <p className="mt-3 text-sm leading-8 text-gray-700 sm:text-base dark:text-gray-300">
                {movie.description}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3 text-sm leading-6">
            <p>
              <span className="font-semibold text-gray-500 dark:text-gray-400">
                Director:{" "}
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {directors.length > 0 ? directors.join(", ") : "Not Available"}
              </span>
            </p>
          </div>

          {cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Cast
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {cast.map((actor) => (
                  <span
                    key={actor}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-brand/40 hover:text-brand dark:border-white/10 dark:bg-panel dark:text-gray-300 dark:hover:border-brand/40 dark:hover:text-brand"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const MovieDetailsPage = ({ params }: MovieDetailsPageProps) => {
  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetailsContent params={params} />
    </Suspense>
  );
};

export default MovieDetailsPage;
