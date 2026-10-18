const MovieSearchCardSkeleton = () => {
  return (
    <li
      className="overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-sm"
      aria-hidden="true"
    >
      {/* Poster */}
      <div className="aspect-[2/3] w-full animate-pulse bg-gray-800" />

      {/* Movie information */}
      <div className="p-4">
        {/* Title: up to two lines */}
        <div className="space-y-2">
          <div className="h-6 w-4/5 animate-pulse rounded bg-gray-800" />
          <div className="h-6 w-2/5 animate-pulse rounded bg-gray-800" />
        </div>

        {/* Rating and release year */}
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-7 w-24 animate-pulse rounded-md bg-gray-800" />
            <div className="h-5 w-32 animate-pulse rounded bg-gray-800" />
          </div>

          {/* Genres */}
          <div className="mt-4 flex min-h-7 flex-wrap items-start gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-gray-800" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-gray-800" />
            <div className="h-7 w-16 animate-pulse rounded-full bg-gray-800" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieSearchCardSkeleton;
