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

function MovieCardDetail({ movie }: MovieProps ) {
  const details = [{ label: "Release Date", value: movie.release_date }];
  return (
    <>
      <ul className="mt-4 space-y-2">
        {details.map(
          (detail, index) =>
            detail.value && (
              <li className="text-sm text-gray-400" key={index}>
                <span className="font-semibold">{detail.label}</span>:{" "}
                {detail.value}
              </li>
            )
        )}
      </ul>
      <TruncatedText 
        className="mt-2 text-sm text-gray-400" 
        text={movie.overview} 
        maxLength={100} 
      />
    </>
  );
}

export default function MovieCard({ movie }: MovieProps) {
  const bgUrl = `${process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL}/w500/${movie.poster_path}`;

  return (
    <Card
      className="group/card container max-w-sm bg-cover bg-center bg-blend-overlay bg-black/40 text-secondary rounded-xl hover:bg-black/60"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url(${bgUrl})`,
      }}
    >
      <CardHeader className="h-56 flex flex-row justify-end items-start gap-1 space-y-0 p-4">
        {movie.vote_average > 0 && (
          <Badge className="h-6">
            <AiFillStar className="text-yellow-500 mr-1" />{" "}
            {movie.vote_average.toFixed(1)} / 10
          </Badge>
        )}

        {movie.popularity && (
          <Badge className="h-6">
            <FaArrowTrendUp className="text-blue-500 mr-1" />{" "}
            {movie.popularity.toFixed(0)}
          </Badge>
        )}
      </CardHeader>
      <CardContent className=" p-4">
        <CardTitle className="text-xl line-clamp-1">{movie.title}</CardTitle>
        <CardDescription>{/* TODO */}</CardDescription>
        <MovieCardDetail movie={movie} />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-1 px-2 py-1  rounded-b-2xl">
        <Button className="hover:border" size="sm">
          Watch Now
        </Button>
        <div>
          <Button variant="ghost" size="icon">
            <Link
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaImdb className="size-6 text-yellow-400" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
