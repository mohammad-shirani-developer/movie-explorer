"use client";

const RetryButton = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleRetry}
      className="mt-6 rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
    >
      Try Again
    </button>
  );
};

export default RetryButton;
