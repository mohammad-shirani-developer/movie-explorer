import Image from "next/image";
import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <li>
      <Image src={movie.poster} alt={movie.name} width={300} height={450} />

      <h2>{movie.name}</h2>

      <p>IMDb: {movie.imdbRating}</p>
      <p>Year: {movie.year}</p>
      <p>Genres: {movie.genres.join(", ")}</p>
    </li>
  );
};

export default MovieCard;
