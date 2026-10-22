"use client";

const RetryButton = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleRetry}
      className="mt-6 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
    >
      Try Again
    </button>
  );
};

export default RetryButton;
