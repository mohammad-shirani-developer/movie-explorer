import MovieGridSkeleton from "./MovieGridSkeleton";

const FeaturedMoviesSkeleton = () => {
  return (
    <section
      className="px-4 py-14 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading featured movies"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-9 w-64 max-w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>

        <MovieGridSkeleton count={4} />
      </div>
    </section>
  );
};

export default FeaturedMoviesSkeleton;
