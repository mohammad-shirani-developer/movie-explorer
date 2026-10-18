const MovieCardSkeleton = () => {
  return (
    <li
      className="overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-sm"
      aria-hidden="true"
    >
      {/* Poster: same aspect ratio as MovieCard */}
      <div className="aspect-[2/3] w-full animate-pulse bg-gray-800" />

      {/* Information: same padding as MovieCard */}
      <div className="p-4 sm:p-5">
        {/* Title: reserves space for up to two lines */}
        <div className="space-y-2">
          <div className="h-6 w-4/5 animate-pulse rounded bg-gray-800" />
          <div className="h-6 w-2/5 animate-pulse rounded bg-gray-800" />
        </div>

        {/* Rating and release year */}
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-7 w-20 animate-pulse rounded-md bg-gray-800" />
            <div className="h-5 w-28 animate-pulse rounded bg-gray-800" />
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-800" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-800" />
            <div className="h-6 w-14 animate-pulse rounded-full bg-gray-800" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCardSkeleton;
