"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const pathname = usePathname();

  const navLinkClass = (href: string) => {
    // Home matches exactly; section links also stay active on child routes
    // (e.g. /movies/tt0111161 keeps the Movies link highlighted).
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return `text-sm font-medium transition-colors ${
      isActive
        ? "text-brand"
        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/75 text-gray-900 backdrop-blur-md dark:border-white/10 dark:bg-ink/75 dark:text-white">
      <nav className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10 2xl:px-12">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          Movie <span className="text-brand">Explorer</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-5 sm:gap-8">
            <li>
              <Link href="/" className={navLinkClass("/")}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/movies" className={navLinkClass("/movies")}>
                Movies
              </Link>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
