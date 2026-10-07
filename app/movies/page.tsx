import { Suspense } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../lib/api";

const MoviesContent = async () => {
  const data = await getPopularMovies();
  const movies = data.metas;

  console.log(data);

  return (
    <div>
      <h1>Movie Explorer</h1>
      <ul className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
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
