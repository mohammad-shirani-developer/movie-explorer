import Link from "next/link";
import { Suspense } from "react";
import FeaturedMovies from "./components/FeaturedMovies";

const HomePage = async () => {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Your next favorite movie
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Discover stories
            <span className="block text-amber-400">worth watching.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            Explore movies, discover new genres, and find your next favorite
            film in one place.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/movies"
              className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              Explore Movies
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href="/movies"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Browse Collection
            </Link>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold text-white">Discover</p>
              <p className="mt-1 text-sm text-gray-400">
                Movies for every mood
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Explore</p>
              <p className="mt-1 text-sm text-gray-400">Different genres</p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold text-white">Find</p>
              <p className="mt-1 text-sm text-gray-400">Your next favorite</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="px-4 py-16 text-center text-gray-400">
            Loading featured movies...
          </section>
        }
      >
        <FeaturedMovies />
      </Suspense>
    </main>
  );
};

export default HomePage;
