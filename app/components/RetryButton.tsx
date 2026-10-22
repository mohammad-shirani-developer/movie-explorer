"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

const RetryButton = () => {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();

  const handleRetry = () => {
    startRetry(() => {
      // re-render the server components without a full page reload
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleRetry}
      disabled={isRetrying}
      className="mt-6 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-ink"
    >
      {isRetrying ? "Retrying..." : "Try Again"}
    </button>
  );
};

export default RetryButton;
