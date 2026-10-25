import { useSyncExternalStore } from "react";

/**
 * Watchlist store — localStorage-backed and hydration-safe.
 *
 * The same pattern as a cart store: a module-level snapshot string read via
 * useSyncExternalStore, structured validation on every read (a corrupted
 * payload degrades to an empty list instead of crashing the pages), and a
 * server snapshot of "" so SSR and the hydration render always agree before
 * the real client value appears.
 *
 * Entries keep only the fields the cards render — the full Cinemeta payload
 * never goes into localStorage.
 */

export type WatchlistEntry = {
  id: string;
  name: string;
  poster: string | null;
  year: string | null;
  imdbRating: string | null;
  genres: string[] | null;
};

const WATCHLIST_KEY = "watchlist";

const parseEntries = (raw: string): WatchlistEntry[] => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const entries: WatchlistEntry[] = [];
  const seenIds = new Set<string>();

  for (const item of parsed) {
    if (
      typeof item === "object" &&
      item !== null &&
      typeof (item as WatchlistEntry).id === "string" &&
      (item as WatchlistEntry).id.trim() !== "" &&
      typeof (item as WatchlistEntry).name === "string" &&
      !seenIds.has((item as WatchlistEntry).id)
    ) {
      const entry = item as WatchlistEntry;

      seenIds.add(entry.id);

      entries.push({
        id: entry.id,
        name: entry.name,
        poster: typeof entry.poster === "string" ? entry.poster : null,
        year: typeof entry.year === "string" ? entry.year : null,
        imdbRating:
          typeof entry.imdbRating === "string" ? entry.imdbRating : null,
        genres: Array.isArray(entry.genres)
          ? entry.genres.filter((genre) => typeof genre === "string")
          : null,
      });
    }
  }

  return entries;
};

/* -----------------------------
   Store
----------------------------- */

let snapshot = "";
let initialized = false;

const listeners = new Set<() => void>();

/* Cross-tab sync: when a second tab toggles something, the "storage"
   event fires everywhere except the writer tab — refresh the cached
   snapshot and notify so badges and lists stay consistent and a stale
   tab never overwrites the other tab's changes with its old view. */
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== WATCHLIST_KEY && event.key !== null) {
      return;
    }

    try {
      snapshot = window.localStorage.getItem(WATCHLIST_KEY) ?? "";
    } catch {
      snapshot = "";
    }

    listeners.forEach((listener) => {
      listener();
    });
  });
}

const subscribeToWatchlist = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getWatchlistSnapshot = () => {
  if (typeof window === "undefined") {
    return "";
  }

  if (!initialized) {
    initialized = true;

    try {
      snapshot = window.localStorage.getItem(WATCHLIST_KEY) ?? "";
    } catch {
      snapshot = "";
    }
  }

  return snapshot;
};

const getServerWatchlistSnapshot = () => "";

const updateWatchlist = (entries: WatchlistEntry[]) => {
  snapshot = JSON.stringify(entries);

  try {
    window.localStorage.setItem(WATCHLIST_KEY, snapshot);
  } catch {
    // Private mode / quota errors: the in-memory list still updates so the
    // session stays usable, it just will not survive a reload.
  }

  listeners.forEach((listener) => {
    listener();
  });
};

/** Flips the movie's membership; returns true when it is now saved.
 *  Only the fields the cards render are persisted — the raw Cinemeta
 *  payload (trailers, links, popularity...) never goes into localStorage. */
export const toggleInWatchlist = (movie: WatchlistEntry): boolean => {
  const entries = parseEntries(getWatchlistSnapshot());
  const isSaved = entries.some((entry) => entry.id === movie.id);

  if (isSaved) {
    updateWatchlist(entries.filter((entry) => entry.id !== movie.id));

    return false;
  }

  const entry: WatchlistEntry = {
    id: movie.id,
    name: movie.name,
    poster: movie.poster ?? null,
    year: movie.year ?? null,
    imdbRating: movie.imdbRating ?? null,
    genres: movie.genres ?? null,
  };

  updateWatchlist([entry, ...entries]);

  return true;
};

export const removeFromWatchlist = (id: string) => {
  const entries = parseEntries(getWatchlistSnapshot());

  updateWatchlist(entries.filter((entry) => entry.id !== id));
};

/* -----------------------------
   Hook
----------------------------- */

const emptySubscribe = () => () => {};

const getClientHydrationSnapshot = () => true;

const getServerHydrationSnapshot = () => false;

export const useWatchlist = () => {
  const snapshotValue = useSyncExternalStore(
    subscribeToWatchlist,
    getWatchlistSnapshot,
    getServerWatchlistSnapshot,
  );

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );

  const entries = snapshotValue ? parseEntries(snapshotValue) : [];

  return {
    entries,
    isHydrated,
    has: (id: string) => entries.some((entry) => entry.id === id),
    toggle: toggleInWatchlist,
    remove: removeFromWatchlist,
  };
};
