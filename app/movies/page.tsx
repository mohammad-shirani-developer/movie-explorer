import type { Metadata } from "next";
import { Suspense } from "react";
import MoviesContent from "../components/MoviesContent";
import MovieGridSkeleton from "../components/skeletons/MovieGridSkeleton";
import { getPopularMovies } from "../lib/api";

export const metadata: Metadata = {
  title: "Explore Movies",
  description:
    "Browse top movies, filter by genre, sort by IMDb rating and search for any title.",
};

const MoviesPageContent = async () => {
  const data = await getPopularMovies();
  const movies = data.metas;

  return <MoviesContent movies={movies} hasMore={data.hasMore} />;
};

const MoviesPage = () => {
  return (
    <Suspense
      fallback={
        // Mirrors the real MoviesContent container so the swap is seamless.
        <main className="min-h-screen">
          <div className="mx-auto w-full max-w-none px-4 py-12 sm:px-5 sm:py-16 lg:px-6">
            <div aria-hidden="true">
              <div className="h-4 w-56 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="mt-3 h-10 w-72 max-w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            </div>

            <div className="mb-6 mt-6 grid grid-cols-1 items-end gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"
                />
              ))}
            </div>

            <MovieGridSkeleton />
          </div>
        </main>
      }
    >
      <MoviesPageContent />
    </Suspense>
  );
};

export default MoviesPage;
