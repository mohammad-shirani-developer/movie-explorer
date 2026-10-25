import type { Metadata } from "next";

import WatchlistPageClient from "../components/WatchlistPageClient";

export const metadata: Metadata = {
  title: "My Watchlist",
  description:
    "Movies you saved to watch later — stored on this device, ready whenever you are.",
};

const WatchlistPage = () => {
  return <WatchlistPageClient />;
};

export default WatchlistPage;
