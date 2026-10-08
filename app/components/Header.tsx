import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <nav className=" flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Movie Explorer
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/movies"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
