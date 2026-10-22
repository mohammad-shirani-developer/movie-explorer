/**
 * Parses a raw Cinemeta IMDb rating ("8.8", "7", "N/A", "", null, ...) into
 * a usable number. Returns null when the movie has no meaningful rating, so
 * every surface (cards, hero, detail page, sorting) treats unrated titles
 * identically instead of each re-implementing — and drifting on — the check.
 */
export const parseImdbRating = (
  raw: string | null | undefined,
): number | null => {
  if (typeof raw !== "string") {
    return null;
  }

  const trimmed = raw.trim();

  if (!trimmed || trimmed === "N/A") {
    return null;
  }

  const rating = Number(trimmed);

  return Number.isFinite(rating) && rating > 0 ? rating : null;
};
