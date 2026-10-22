import { Suspense } from "react";
import MoviesContent from "../components/MoviesContent";
import MovieGridSkeleton from "../components/skeletons/MovieGridSkeleton";
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
        <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
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
