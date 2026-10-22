const HeroSkeleton = () => {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden sm:min-h-[640px]"
      aria-busy="true"
      aria-label="Loading featured movie"
    >
      <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-panel" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-4 pb-14 sm:min-h-[640px] sm:px-6 lg:px-8">
        <div className="h-6 w-36 animate-pulse rounded-full bg-gray-300/70 dark:bg-white/10" />

        <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-lg bg-gray-300/70 dark:bg-white/10 sm:h-16" />

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="h-8 w-24 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
          <div className="h-8 w-32 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
          <div className="h-8 w-28 animate-pulse rounded-md bg-gray-300/70 dark:bg-white/10" />
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-gray-300/70 dark:bg-white/10" />
          <div className="h-5 w-4/5 max-w-xl animate-pulse rounded bg-gray-300/70 dark:bg-white/10" />
        </div>

        <div className="mt-8 flex gap-4">
          <div className="h-12 w-40 animate-pulse rounded-lg bg-gray-300/70 dark:bg-white/10" />
          <div className="h-12 w-44 animate-pulse rounded-lg bg-gray-300/70 dark:bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
