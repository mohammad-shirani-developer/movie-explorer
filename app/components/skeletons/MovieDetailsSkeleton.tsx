const MovieDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      <div
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12"
        aria-busy="true"
        aria-label="Loading movie details"
      >
        {/* Poster */}
        <div className="mx-auto aspect-[2/3] w-full max-w-sm animate-pulse rounded-2xl border border-white/10 bg-gray-900 md:mx-0" />

        {/* Movie information */}
        <div className="flex flex-col">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-10 w-4/5 animate-pulse rounded bg-gray-800 sm:h-12 lg:h-14" />
            <div className="h-10 w-2/5 animate-pulse rounded bg-gray-800 sm:h-12 lg:hidden" />
          </div>

          {/* Rating, year and runtime */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="h-7 w-20 animate-pulse rounded-md bg-gray-800" />
            <div className="h-5 w-28 animate-pulse rounded bg-gray-800" />
            <div className="h-5 w-24 animate-pulse rounded bg-gray-800" />
          </div>

          {/* Genres */}
          <div className="mt-5 flex min-h-7 flex-wrap gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-gray-800" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-gray-800" />
            <div className="h-7 w-16 animate-pulse rounded-full bg-gray-800" />
          </div>

          {/* Director and country */}
          <div className="mt-6 space-y-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-800" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-gray-800" />
          </div>

          {/* Description */}
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-800" />
          </div>

          {/* Cast */}
          <div className="mt-8">
            <div className="h-7 w-20 animate-pulse rounded bg-gray-800" />

            <div className="mt-3 flex flex-wrap gap-2">
              <div className="h-8 w-24 animate-pulse rounded-full bg-gray-800" />
              <div className="h-8 w-32 animate-pulse rounded-full bg-gray-800" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-800" />
              <div className="h-8 w-28 animate-pulse rounded-full bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailsSkeleton;
