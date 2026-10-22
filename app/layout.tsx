import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "./components/Header";
import ThemeProvider from "./theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Explore and discover movies",
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
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
