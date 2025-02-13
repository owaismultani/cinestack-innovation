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
  origin_country: string;
  backdrop_path: string;
  production_companies: { id: number; name: string; logo_path: string }[];
  budget: number;
  revenue: number;
  videos?: { results: { key: string; type: string }[] };
  images?: { backdrops: { file_path: string }[] };
  cast?: { id: number; name: string; character: string; profile_path: string }[];
  reviews?: { id: string; author: string; content: string; author_details: { rating: number } }[];
  similarMovies?: { id: number; title: string; poster_path: string }[];
}
