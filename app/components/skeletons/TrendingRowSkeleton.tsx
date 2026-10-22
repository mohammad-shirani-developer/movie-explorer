const TrendingRowSkeleton = () => {
  return (
    <section
      className="border-b border-gray-200/70 py-12 sm:py-14 dark:border-white/10"
      aria-busy="true"
      aria-label="Loading trending movies"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-9 w-56 max-w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>

        <ul className="-mx-4 flex gap-4 overflow-hidden px-4 sm:-mx-6 sm:gap-5 sm:px-6">
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className="w-36 shrink-0 sm:w-44">
              <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-gray-200 dark:bg-panel" />
              <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingRowSkeleton;
