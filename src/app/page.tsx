"use client";
import MovieCard from "@/components/MovieCard";

import { useState, useEffect } from "react";
import { MovieProps } from "@/types";

export default function Home() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  async function fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center items-center">
      {movies.map((movie) => (
        <MovieCard key={movies[0].id} movie={movie} />
      ))}
    </div>
  );
}
