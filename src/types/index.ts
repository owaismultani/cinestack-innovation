export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  overview: string;
  tagline: string | null;
  vote_average: number;
  vote_count: number;
  homepage: string;
  release_date: string;
  adult: boolean;
  imdb_id: string | null;
  popularity: number;
  spoken_languages: { english_name: string }[];
}