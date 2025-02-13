import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Share2 } from "lucide-react";
import { AiFillStar } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa";
import Link from "next/link";
import { Movie } from "@/types";
import TruncatedText from "./TruncatedText";

export interface MovieProps {
  movie: Movie;
}

function MovieCardDetail({ movie }: MovieProps) {
  const details = [{ label: "Release Date", value: movie.release_date }];
  return (
    <>
      <ul className="mt-4 space-y-2">
        {details.map(
          (detail, index) =>
            detail.value && (
              <li className="text-sm text-gray-300" key={index}>
                <span className="font-semibold text-gray-200">
                  {detail.label}
                </span>
                : {detail.value}
              </li>
            )
        )}
      </ul>
      <TruncatedText
        className="mt-2 text-sm text-gray-300"
        text={movie.overview}
        maxLength={100}
      />
    </>
  );
}

export default function MovieCard({ movie }: MovieProps) {
  const bgUrl = `${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}/w500/${movie.poster_path}`;

  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <Card
        className="group/card cursor-pointer container max-w-xs bg-cover bg-center bg-blend-overlay bg-black/30 text-gray-200 rounded-xl transition-all duration-300 hover:bg-black/40 hover:shadow-lg shadow-gray-900/40"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${bgUrl})`,
        }}
      >
        {/* Header */}
        <CardHeader className="h-56 flex flex-row justify-between items-start gap-2 space-y-0 p-4">
          <div className="flex space-x-2">
            {movie.vote_average > 0 && (
              <Badge className="h-6 bg-gray-800 hover:bg-yellow-300/40 text-yellow-300 hover:text-white border border-yellow-500 shadow-sm shadow-yellow-500/40 px-3 text-sm transition-all duration-200">
                <AiFillStar className="text-yellow-300 hover:text-yellow-200 transition-colors duration-200 mr-1" />
                {movie.vote_average.toFixed(1)} / 10
              </Badge>
            )}

            {movie.popularity && (
              <Badge className="h-6 bg-gray-800 hover:bg-blue-300/40 text-blue-300 border hover:text-white border-blue-500 shadow-sm shadow-blue-500/40 px-3 text-sm transition-all duration-200">
                <FaArrowTrendUp className="text-blue-300 hover:text-blue-200 transition-colors duration-200 mr-1" />
                {movie.popularity.toFixed(0)}
              </Badge>
            )}
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4">
          <CardTitle className="text-lg sm:text-xl line-clamp-1">
            {movie.title}
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm sm:text-base">
            {/* Future Description Placeholder */}
          </CardDescription>
          <MovieCardDetail movie={movie} />
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between px-4 py-3 rounded-b-xl bg-gray-900/60">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/40 px-4 py-2 rounded-lg transition-all duration-200">
            Watch Now
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700 p-2 rounded-full transition-all duration-200"
            >
              <Link
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaImdb className="size-6 text-yellow-400 transition-transform duration-200 hover:scale-110" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700 p-2 rounded-full transition-all duration-200"
            >
              <Bookmark className="size-5 text-gray-300 transition-transform duration-200 hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700 p-2 rounded-full transition-all duration-200"
            >
              <Share2 className="size-5 text-gray-300 transition-transform duration-200 hover:scale-110" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
