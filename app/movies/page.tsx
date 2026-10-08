import { Suspense } from "react";
import MoviesContent from "../components/MoviesContent";
import { getPopularMovies } from "../lib/api";

const MoviesPageContent = async () => {
  const data = await getPopularMovies();
  const movies = data.metas;

  return <MoviesContent movies={movies} />;
};

const MoviesPage = () => {
  return (
    <Suspense fallback={<p>Loading movies...</p>}>
      <MoviesPageContent />
    </Suspense>
  );
};

export default MoviesPage;
