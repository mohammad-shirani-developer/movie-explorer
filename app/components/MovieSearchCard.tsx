import Image from "next/image";
import Link from "next/link";
import type { MovieSearchResult } from "../types/movie";

type MovieSearchCardProps = {
  movie: MovieSearchResult;
};

const MovieSearchCard = ({ movie }: MovieSearchCardProps) => {
  return (
    <li className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.poster}
            alt={movie.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold">{movie.name}</h2>

          <p className="mt-2 text-sm text-gray-500">{movie.releaseInfo}</p>
        </div>
      </Link>
    </li>
  );
};

export default MovieSearchCard;
