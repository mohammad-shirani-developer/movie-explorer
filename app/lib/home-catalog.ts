import { cache } from "react";
import { getPopularMovies } from "./api";
import type { MoviesResponse } from "../types/movie";

/**
 * Per-request cached view of the top-movies catalog shared by every server
 * component on the home page, so the hero, trending row and featured grid
 * trigger one network round trip per request instead of three independent
 * fetches. Returns null on failure so each section can degrade gracefully.
 */
export const getHomeCatalog = cache(
  async (): Promise<MoviesResponse | null> => {
    try {
      return await getPopularMovies();
    } catch {
      return null;
    }
  },
);
