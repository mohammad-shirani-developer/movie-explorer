"use client";

import Image from "next/image";
import { useState } from "react";

type MoviePosterProps = {
  src: string | null;
  alt: string;
};

const MoviePoster = ({ src, alt }: MoviePosterProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src?.trim() || hasError) {
    return (
      <div
        role="img"
        aria-label={`Poster unavailable for ${alt}`}
        className="flex h-full w-full items-center justify-center bg-gray-200 p-4 text-center text-sm text-gray-500"
      >
        Poster unavailable
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-300 hover:scale-105"
      onError={() => setHasError(true)}
    />
  );
};

export default MoviePoster;
