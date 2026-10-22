import { Suspense } from "react";
import FeaturedMovies from "./components/FeaturedMovies";
import FeaturedMoviesSkeleton from "./components/skeletons/FeaturedMoviesSkeleton";
import HeroMovie from "./components/HeroMovie";
import HeroSkeleton from "./components/skeletons/HeroSkeleton";
import TrendingRow from "./components/TrendingRow";
import TrendingRowSkeleton from "./components/skeletons/TrendingRowSkeleton";

const HomePage = async () => {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroMovie />
      </Suspense>

      <Suspense fallback={<TrendingRowSkeleton />}>
        <TrendingRow />
      </Suspense>

      <Suspense fallback={<FeaturedMoviesSkeleton />}>
        <FeaturedMovies />
      </Suspense>
    </main>
  );
};

export default HomePage;
