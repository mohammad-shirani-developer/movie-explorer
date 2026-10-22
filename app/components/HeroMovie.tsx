import Image from "next/image";
import Link from "next/link";
import { getPopularMovies } from "../lib/api";
import type { Movie } from "../types/movie";

const DESCRIPTION_LIMIT = 220;

const HeroFallback = () => (
  <section className="px-6 py-24 sm:py-28">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
        Your next favorite movie
      </p>

      <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl dark:text-white">
        Discover stories
        <span className="block text-brand">worth watching.</span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-400">
        Explore movies, discover new genres, and find your next favorite film
        in one place.
      </p>

      <Link
        href="/movies"
        className="mt-9 inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
      >
        Explore Movies
        <span className="ml-2" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  </section>
);

const HeroMovie = async () => {
  let heroMovie: Movie | null = null;

  try {
    const data = await getPopularMovies();

    heroMovie =
      data.metas.find((movie) => movie.background?.trim()) ??
      data.metas[0] ??
      null;
  } catch {
    heroMovie = null;
  }

  if (!heroMovie) {
    return <HeroFallback />;
  }

  const rating = Number(heroMovie.imdbRating);
  const hasRating =
    heroMovie.imdbRating?.trim() !== "" &&
    heroMovie.imdbRating !== "N/A" &&
    Number.isFinite(rating);

  const genres =
    heroMovie.genres?.filter((genre) => genre.trim()).slice(0, 3) ?? [];

  const hasBackdrop = Boolean(heroMovie.background?.trim());
  const backdrop = hasBackdrop ? heroMovie.background : heroMovie.poster;

  const description =
    heroMovie.description?.trim() &&
    heroMovie.description.length > DESCRIPTION_LIMIT
      ? `${heroMovie.description.slice(0, DESCRIPTION_LIMIT)}…`
      : heroMovie.description;

  return (
    <section className="relative min-h-[560px] overflow-hidden sm:min-h-[640px]">
      <Image
        src={backdrop}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${
          hasBackdrop ? "" : "scale-110 blur-sm"
        }`}
      />

      {/* Fade the backdrop into the page background for cinematic legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/10 dark:from-ink dark:via-ink/70 dark:to-ink/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent dark:from-ink/60"
      />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-4 pb-14 pt-40 sm:min-h-[640px] sm:px-6 lg:px-8">
        <p className="mb-4 inline-flex w-fit items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur-sm">
          Featured movie
        </p>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-sm sm:text-6xl dark:text-white">
          {heroMovie.name}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {hasRating && (
            <span className="rounded-md bg-yellow-400 px-2 py-1 text-sm font-bold text-gray-950">
              IMDb {heroMovie.imdbRating}
            </span>
          )}

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {heroMovie.year?.trim() && heroMovie.year !== "N/A"
              ? heroMovie.year
              : "Year unknown"}
          </span>

          {heroMovie.runtime?.trim() && heroMovie.runtime !== "N/A" && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {heroMovie.runtime}
            </span>
          )}

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-gray-900/10 bg-gray-900/5 px-2.5 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm dark:border-white/15 dark:bg-white/10 dark:text-gray-100"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base sm:leading-8 dark:text-gray-300">
            {description}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/movies/${heroMovie.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
          >
            View Details
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>

          <Link
            href="/movies"
            className="inline-flex items-center justify-center rounded-lg border border-gray-900/15 bg-white/50 px-6 py-3.5 font-semibold text-gray-900 backdrop-blur-sm transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            Browse All Movies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroMovie;
