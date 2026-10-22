import FeaturedMoviesSkeleton from "./FeaturedMoviesSkeleton";
import HeroSkeleton from "./HeroSkeleton";
import TrendingRowSkeleton from "./TrendingRowSkeleton";

const HomePageSkeleton = () => {
  return (
    <main
      className="min-h-screen"
      aria-busy="true"
      aria-label="Loading home page"
    >
      {/* Hero skeleton */}
      <HeroSkeleton />

      {/* Trending row skeleton */}
      <TrendingRowSkeleton />

      {/* Featured movies skeleton */}
      <FeaturedMoviesSkeleton />
    </main>
  );
};

export default HomePageSkeleton;
