import { Suspense } from "react";
import { getPopularMovies } from "../lib/api";

const MoviesContent = async () => {
  const data = await getPopularMovies();

  console.log(data);

  return (
    <div>
      <h1>Movie Explorer</h1>
    </div>
  );
};

const MoviesPage = () => {
  return (
    <Suspense fallback={<p>Loading movies...</p>}>
      <MoviesContent />
    </Suspense>
  );
};

export default MoviesPage;
