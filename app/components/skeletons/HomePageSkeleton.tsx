import FeaturedMoviesSkeleton from "./FeaturedMoviesSkeleton";

const HomePageSkeleton = () => {
  return (
    <main
      className="min-h-screen bg-gray-950 text-white"
      aria-busy="true"
      aria-label="Loading home page"
    >
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-52 animate-pulse rounded bg-gray-800" />

          <div className="mt-6 space-y-3">
            <div className="h-12 w-full max-w-2xl animate-pulse rounded bg-gray-800 sm:h-16 lg:h-20" />
            <div className="h-12 w-4/5 max-w-xl animate-pulse rounded bg-gray-800 sm:h-16 lg:h-20" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-5 w-full max-w-xl animate-pulse rounded bg-gray-800" />
            <div className="h-5 w-4/5 max-w-lg animate-pulse rounded bg-gray-800" />
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-800 sm:w-44" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-800 sm:w-48" />
          </div>

          {/* Highlights */}
          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="h-7 w-28 animate-pulse rounded bg-gray-800" />
              <div className="h-4 w-36 max-w-full animate-pulse rounded bg-gray-800" />
            </div>

            <div className="space-y-3">
              <div className="h-7 w-24 animate-pulse rounded bg-gray-800" />
              <div className="h-4 w-32 max-w-full animate-pulse rounded bg-gray-800" />
            </div>

            <div className="col-span-2 space-y-3 sm:col-span-1">
              <div className="h-7 w-20 animate-pulse rounded bg-gray-800" />
              <div className="h-4 w-36 max-w-full animate-pulse rounded bg-gray-800" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Skeleton */}
      <FeaturedMoviesSkeleton />
    </main>
  );
};

export default HomePageSkeleton;
