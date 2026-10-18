import MovieCardSkeleton from "./MovieCardSkeleton";

type MovieGridSkeletonProps = {
  count?: number;
};

const MovieGridSkeleton = ({ count = 8 }: MovieGridSkeletonProps) => {
  return (
    <ul
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
      aria-label="Loading movies"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </ul>
  );
};

export default MovieGridSkeleton;
