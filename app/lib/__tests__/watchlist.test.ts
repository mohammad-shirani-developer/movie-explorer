import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { WatchlistEntry } from "../watchlist";

const KEY = "watchlist";

const spidey: WatchlistEntry = {
  id: "tt22084616",
  name: "Spider-Man: Brand New Day",
  poster: "https://example.com/spidey.jpg",
  year: "2026",
  imdbRating: "7.4",
  genres: ["Action", "Adventure"],
};

const batman: WatchlistEntry = {
  id: "tt0312724",
  name: "Batman Begins",
  poster: null,
  year: "2005",
  imdbRating: "8.2",
  genres: ["Action"],
};

/* The watchlist module keeps its snapshot in module-level state, so every
   test gets a FRESH copy of the module — otherwise entries saved by one
   test leak into the next and a toggle flips from "save" to "remove". */
const freshWatchlist = async () => {
  vi.resetModules();

  return import("../watchlist");
};

const readStorage = (): WatchlistEntry[] =>
  JSON.parse(window.localStorage.getItem(KEY) ?? "[]");

beforeEach(() => {
  window.localStorage.clear();
});

describe("toggle", () => {
  it("returns true when saving and puts the newest entry first", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    expect(toggleInWatchlist(spidey)).toBe(true);
    expect(toggleInWatchlist(batman)).toBe(true);

    expect(readStorage().map((entry) => entry.id)).toEqual([
      batman.id,
      spidey.id,
    ]);
  });

  it("returns false when un-saving and removes the movie", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    expect(toggleInWatchlist(spidey)).toBe(true);
    expect(toggleInWatchlist(spidey)).toBe(false);

    expect(readStorage()).toEqual([]);
  });

  it("removeFromWatchlist removes only the targeted movie", async () => {
    const { removeFromWatchlist, toggleInWatchlist } = await freshWatchlist();

    toggleInWatchlist(spidey);
    toggleInWatchlist(batman);
    removeFromWatchlist(spidey.id);

    expect(readStorage().map((entry) => entry.id)).toEqual([batman.id]);
  });

  it("persists only the card fields the UI renders", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    toggleInWatchlist(spidey);

    const [entry] = readStorage();

    /* Sorting keeps the assertion independent of property order. */
    expect(Object.keys(entry).sort()).toEqual([
      "genres",
      "id",
      "imdbRating",
      "name",
      "poster",
      "year",
    ]);
  });
});

describe("reading a saved list", () => {
  it("degrades a corrupted payload to a working empty list", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    window.localStorage.setItem(KEY, "{not json at all");

    /* Nothing crashes: the store reads an empty list and the toggle
       simply starts over from scratch. */
    expect(toggleInWatchlist(spidey)).toBe(true);
    expect(readStorage().map((entry) => entry.id)).toEqual([spidey.id]);
  });

  it("drops invalid entries: duplicates, blank ids and non-string ids", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        { id: "tt1", name: "The Valid One" },
        { id: "tt1", name: "Duplicate Of The Valid One" },
        { id: "   ", name: "Blank Id" },
        { id: 42, name: "Numeric Id" },
        { id: "tt9" },
        "just a string",
      ]),
    );

    toggleInWatchlist(spidey);

    expect(readStorage().map((entry) => entry.id)).toEqual([
      spidey.id,
      "tt1",
    ]);
  });

  it("normalizes optional fields to null when they are not strings", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: "tt5",
          name: "Weird Movie",
          poster: 123,
          year: { value: "2020" },
          imdbRating: true,
          genres: "Action",
        },
      ]),
    );

    toggleInWatchlist(spidey);

    const [, weird] = readStorage();

    expect(weird.id).toBe("tt5");
    expect(weird.name).toBe("Weird Movie");
    expect(weird.poster).toBeNull();
    expect(weird.year).toBeNull();
    expect(weird.imdbRating).toBeNull();
    expect(weird.genres).toBeNull();
  });

  it("filters non-string values out of genres", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: "tt6",
          name: "Mixed Genres",
          genres: ["Action", 42, null, "Comedy"],
        },
      ]),
    );

    toggleInWatchlist(spidey);

    const [, mixed] = readStorage();

    expect(mixed.genres).toEqual(["Action", "Comedy"]);
  });
});

describe("cross-tab sync", () => {
  it("refreshes the snapshot when another tab writes to storage", async () => {
    const { toggleInWatchlist } = await freshWatchlist();

    toggleInWatchlist(spidey); // our tab: [spidey]

    /* Another tab replaces the whole list with its own version. The
       "storage" event fires everywhere EXCEPT the writer tab, so our
       cached snapshot is now stale. */
    window.localStorage.setItem(
      KEY,
      JSON.stringify([{ ...batman }]),
    );

    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
    });

    /* Without the refresh, toggling spidey would parse the stale
       [spidey] snapshot, see it as still saved and DELETE it. With the
       refresh it correctly sees [batman] and re-saves spidey on top. */
    expect(toggleInWatchlist(spidey)).toBe(true);

    expect(readStorage().map((entry) => entry.id)).toEqual([
      spidey.id,
      batman.id,
    ]);
  });
});
