import { Suspense } from "react";
import MoviesContent from "../components/MoviesContent";
import { getPopularMovies } from "../lib/api";

const MoviesPageContent = async () => {
  const data = await getPopularMovies();
  const movies = data.metas;

  return <MoviesContent movies={movies} hasMore={data.hasMore} />;
};

const MoviesPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-950 px-4 py-12 text-white sm:px-5 sm:py-16 lg:px-6">
          <div className="mx-auto w-full">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Discover your next favorite
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore Movies
            </h1>

            <div
              className="flex min-h-[300px] flex-col items-center justify-center"
              role="status"
              aria-live="polite"
            >
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-amber-400"
                aria-hidden="true"
              />

              <p className="mt-5 text-sm font-medium text-gray-400">
                Loading movies...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <MoviesPageContent />
    </Suspense>
  );
};

export default MoviesPage;
