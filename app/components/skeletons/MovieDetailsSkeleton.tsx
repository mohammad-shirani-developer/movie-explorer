const MovieDetailsSkeleton = () => {
  return (
    <main
      className="min-h-screen"
      aria-busy="true"
      aria-label="Loading movie details"
    >
      {/* Backdrop banner skeleton — mirrors the 16:9 cinema-screen frame */}
      <section className="sm:pt-6">
        <div className="relative mx-auto h-[420px] w-full max-w-[121vh] overflow-hidden bg-gray-200 sm:aspect-video sm:h-auto sm:rounded-2xl dark:bg-panel">
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-panel" />

          <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-300/70 dark:bg-white/10" />

            <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded-lg bg-gray-300/70 dark:bg-white/10" />

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="h-8 w-20 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
              <div className="h-8 w-28 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
            </div>

            <div className="mt-4 flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300/70 dark:bg-white/10" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-300/70 dark:bg-white/10" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300/70 dark:bg-white/10" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Poster + storyline skeleton */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12 lg:px-8">
        <div className="aspect-[2/3] w-full max-w-[300px] animate-pulse rounded-2xl bg-gray-200 dark:bg-panel" />

        <div className="space-y-3">
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

          <div className="space-y-3 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          </div>

          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

          <div className="flex flex-wrap gap-2 pt-6">
            <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-8 w-32 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailsSkeleton;
