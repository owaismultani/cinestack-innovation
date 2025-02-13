/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Play,
  Clock,
  Star,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Heart,
  User,
} from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";
import TruncatedText from "@/components/TruncatedText";
import { Header } from "@/components/layout/Header";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cast, setCast] = useState<Movie["cast"]>([]);
  const [reviews, setReviews] = useState<Movie["reviews"]>(
    [] as Movie["reviews"]
  );
  const [similarMovies, setSimilarMovies] = useState<Movie["similarMovies"]>(
    [] as Movie["similarMovies"]
  );
  const [watchProviders, setWatchProviders] = useState<any>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,images,credits,reviews,similar`
        );
        const data = await movieRes.json();
        setMovie(data);

        // Get Trailer Video
        const trailer = data.videos?.results.find(
          (vid: any) => vid.type === "Trailer"
        );
        if (trailer) setTrailerKey(trailer.key);

        // Get Backdrop Images
        setImages(
          data.images?.backdrops.slice(0, 6).map((img: any) => img.file_path) ||
            []
        );

        // Get Cast
        setCast(data.credits?.cast.slice(0, 8) || []);

        // Get Reviews
        setReviews(data.reviews?.results?.slice(0, 5) || []);

        // Get Similar Movies
        setSimilarMovies(data.similar?.results?.slice(0, 8) || []);

        // Fetch "Where to Watch" Providers
        const watchRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
        );
        const watchData = await watchRes.json();
        setWatchProviders(watchData.results["US"]); // Change "US" based on location
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
        Loading...
      </div>
    );
  }

  const shareUrl = `https://www.themoviedb.org/movie/${movie.id}`;
  const hashtags = `#${movie.title.replace(/\s+/g, "")} #Movies #Film`;

  return (
    <div className="relative min-h-screen bg-black/50 text-white">
      <Header onSearch={(query) => console.log(query)} />
      {/* Hero Section with Video or Image */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <AnimatePresence>
          {isPlaying && trailerKey ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                layout="fill"
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl font-extrabold drop-shadow-lg tracking-wide"
                >
                  {movie.title}
                </motion.h1>
                <p className="text-lg italic mt-2 text-gray-300">
                  {movie.tagline}
                </p>
                {trailerKey && (
                  <Button
                    onClick={() => setIsPlaying(true)}
                    className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform"
                  >
                    <Play className="h-6 w-6" /> Watch Trailer
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Movie Info */}
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {movie.overview}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-300">
              <p className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" /> {movie.runtime} min
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-yellow-400" />{" "}
                {movie.release_date}
              </p>
              <p className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />{" "}
                {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4"> Watch Now </h3>
            {watchProviders && (
              <div className="grid grid-cols-3 gap-6">
                {watchProviders.rent && (
                  <div className="flex items-center justify-between">
                    {watchProviders.rent.map((provider: any) => (
                      <a
                        key={provider.provider_id}
                        href={`https://www.google.com/search?q=rent+${movie.title}+on+${provider.provider_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                          alt={provider.provider_name}
                          width={40}
                          height={40}
                          className="rounded-lg shadow-md transition-transform group-hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Share Section */}
            <div className="mt-16">
              <h3 className="text-lg font-bold mb-4">Share this movie</h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check+out+${movie.title}+on+TMDb!&url=${shareUrl}&hashtags=${hashtags}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  <FaTwitter className="w-6 h-6" /> Tweet
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  <FaFacebook className="w-6 h-6" /> Share
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
                >
                  <FaLinkedin className="w-6 h-6" /> Share
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${img}`}
                    alt={movie.title}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Cast Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-6">Cast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cast?.map((actor) => (
              <div key={actor.id} className="text-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
                <p className="mt-2 font-semibold">{actor.name}</p>
                <p className="text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies Section */}
        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-6">Similar Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarMovies.map((simMovie) => (
                <MovieCard key={simMovie.id} movie={simMovie as Movie} />
              ))}
            </div>
          </div>
        )}

        {/* /* Reviews Section */}
        {reviews && reviews.length > 0 && (
          <div className="mt-16">
            <h3 className="text-4xl font-extrabold mb-8 text-white tracking-wide text-center">
              🌟 What People Are Saying
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  {/* Floating Neon Border */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500 transition-all duration-300"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    {/* Dynamic User Avatar */}
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r ${
                        index % 3 === 0
                          ? "from-blue-500 to-purple-500"
                          : index % 3 === 1
                          ? "from-green-400 to-cyan-400"
                          : "from-red-500 to-orange-500"
                      }`}
                    >
                      <User className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {review.author}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date().toDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-4">
                    <TruncatedText
                      text={review.content}
                      maxLength={200}
                      className="text-gray-300 text-base leading-relaxed"
                    />
                  </div>

                  {/* Ratings & Reactions */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <span className="text-lg font-bold text-gray-200">
                        {review.author_details?.rating || "N/A"}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-green-700/30 hover:scale-110 transition"
                      >
                        <ThumbsUp className="w-7 h-7 text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-700/30 hover:scale-110 transition"
                      >
                        <ThumbsDown className="w-7 h-7 text-red-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-pink-700/30 hover:scale-110 transition"
                      >
                        <Heart className="w-7 h-7 text-pink-500" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
