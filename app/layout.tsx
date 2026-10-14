import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "./components/Header";
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
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
