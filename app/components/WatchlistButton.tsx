"use client";

import { useWatchlist, type WatchlistEntry } from "../lib/watchlist";

type WatchlistButtonProps = {
  movie: WatchlistEntry;
  /** Extra classes for positioning overlays on posters. */
  className?: string;
};

/**
 * Bookmark toggle for the watchlist. Renders both icon states via CSS-free
 * conditional fill driven by the store — after hydration the server HTML
 * ("not saved") is replaced by the real state in a follow-up render, so
 * there is never a hydration mismatch.
 */
const WatchlistButton = ({ movie, className = "" }: WatchlistButtonProps) => {
  const { has, isHydrated, toggle } = useWatchlist();
  const saved = isHydrated && has(movie.id);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${movie.name} from watchlist` : `Add ${movie.name} to watchlist`
      }
      title={saved ? "In your watchlist" : "Add to watchlist"}
      onClick={(event) => {
        // The card overlays sit inside a link's container — stop the click
        // from navigating to the detail page.
        event.preventDefault();
        event.stopPropagation();
        toggle(movie);
      }}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        saved
          ? "border-brand/60 bg-brand text-white"
          : "border-white/30 bg-gray-900/60 text-white hover:border-brand/60 hover:text-brand"
      } ${className}`}
    >
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" />
      </svg>
    </button>
  );
};

export default WatchlistButton;
