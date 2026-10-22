import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "./components/Header";
import ThemeProvider from "./theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Movie Explorer",
    template: "%s | Movie Explorer",
  },
  description:
    "Discover trending movies, browse by genre, sort by IMDb rating and find your next favorite film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased dark:bg-ink dark:text-white">
        <ThemeProvider>
          {/* usePathname() reads URL data, which requires a Suspense
              boundary during static prerendering (cacheComponents). */}
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
