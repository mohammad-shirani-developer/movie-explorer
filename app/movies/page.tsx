import { Suspense } from "react";
import { getPopularMovies } from "../lib/api";

const MoviesContent = async () => {
  const data = await getPopularMovies();
  const movies = data.metas;

  console.log(data);

  return (
    <div>
      <h1>Movie Explorer</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.name} />

            <h2>{movie.name}</h2>

            <p>IMDb: {movie.imdbRating}</p>
            <p>Year: {movie.year}</p>
            <p>Genres: {movie.genres.join(", ")}</p>
          </li>
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
