"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-amber-400" : "text-gray-400 hover:text-white"
    }`;

  return (
    <header className="border-b border-white/10 bg-gray-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          Movie <span className="text-amber-400">Explorer</span>
        </Link>

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
      </nav>
    </header>
  );
};

export default Header;
