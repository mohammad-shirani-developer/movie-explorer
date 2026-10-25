"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type MoviePosterProps = {
  src: string | null;
  alt: string;
};

const MoviePoster = ({ src, alt }: MoviePosterProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* onLoad alone can miss images that finish decoding between HTML parse
     and hydration (repeat visits, back-cache) — those would sit behind the
     pulsing overlay forever. A completed cached image is detected here. */
  const attachImage = useCallback((element: HTMLImageElement | null) => {
    if (element?.complete && element.naturalWidth > 0) {
      setIsLoading(false);
    }
  }, []);

  if (!src?.trim() || hasError) {
    return (
      <div
        role="img"
        aria-label={`Poster unavailable for ${alt}`}
        className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center text-sm text-gray-500 dark:bg-panel-soft dark:text-gray-500"
      >
        Poster unavailable
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-panel-soft"
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        ref={attachImage}
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
