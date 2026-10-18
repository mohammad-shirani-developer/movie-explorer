"use client";

import Image from "next/image";
import { useState } from "react";

type MoviePosterProps = {
  src: string | null;
  alt: string;
};

const MoviePoster = ({ src, alt }: MoviePosterProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src?.trim() || hasError) {
    return (
      <div
        role="img"
        aria-label={`Poster unavailable for ${alt}`}
        className="flex h-full w-full items-center justify-center bg-gray-800 p-4 text-center text-sm text-gray-400"
      >
        Poster unavailable
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gray-800"
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </>
  );
};

export default MoviePoster;
