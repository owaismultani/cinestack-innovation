'use client';

import { useState, useEffect, useMemo } from "react";
import type { Movie } from "@/types";
import { Header } from "@/components/layout/Header";
import MovieCard from "@/components/MovieCard";
import MovieFilterSidebar from "@/components/layout/SidebarFilter";
import { motion } from "framer-motion";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [releaseYear, setReleaseYear] = useState([1990, 2024]);
  const [minRating, setMinRating] = useState(5);
  const [sortBy, setSortBy] = useState("Popularity");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        let url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    }

    fetchMovies();
  }, [searchQuery]);

  const filteredMoviesMemo = useMemo(() => {
    return movies.filter((movie) => {
      const isGenreMatch = selectedGenres.length
        ? movie.genres?.some((genre) => selectedGenres.includes(genre.name))
        : true;

      const isCountryMatch = selectedCountries.length
        ? selectedCountries.includes(movie.origin_country)
        : true;

      const isYearMatch =
        parseInt(movie.release_date?.slice(0, 4)) >= releaseYear[0] &&
        parseInt(movie.release_date?.slice(0, 4)) <= releaseYear[1];

      const isRatingMatch = movie.vote_average >= minRating;

      return isGenreMatch && isCountryMatch && isYearMatch && isRatingMatch;
    });
  }, [selectedGenres, selectedCountries, releaseYear, minRating, movies]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black/50">
      {/* Header */}
      <Header onSearch={setSearchQuery} />

      {/* Layout */}
      <div className="flex flex-1 mt-16">
        <MovieFilterSidebar
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          releaseYear={releaseYear}
          setReleaseYear={setReleaseYear}
          minRating={minRating}
          setMinRating={setMinRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Movies Grid */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 p-6 flex flex-wrap gap-6 justify-center"
        >
          {filteredMoviesMemo.length > 0 ? (
            filteredMoviesMemo.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 dark:text-gray-400 text-lg mt-10"
            >
              No movies found. 🎬
            </motion.p>
          )}
        </motion.main>
      </div>
    </div>
  );
}
