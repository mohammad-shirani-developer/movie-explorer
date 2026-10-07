import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Movie Explorer</Link>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/movies">Movies</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
