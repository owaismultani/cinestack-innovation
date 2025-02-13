'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

const genres = ["Drama", "Crime", "Action", "Comedy", "Sci-Fi", "Horror"];
const countries = ["Denmark", "France", "Germany", "USA", "Sweden"];
const sortOptions = ["Popularity", "Release Date", "Rating"];

interface MovieFilterSidebarProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  releaseYear: number[];
  setReleaseYear: (year: number[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function MovieFilterSidebar(props: MovieFilterSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:flex flex-col w-80 p-6 border-r border-white/10 dark:border-black/10 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg h-full overflow-y-auto"
    >
      <SidebarContent {...props} />
    </motion.aside>
  );
}
function SidebarContent({
  selectedGenres,
  setSelectedGenres,
  selectedCountries,
  setSelectedCountries,
  releaseYear,
  setReleaseYear,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
}: MovieFilterSidebarProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
      >
        Filters 🎬
      </h2>
      <Separator className="my-4" />

      {/* Genres */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">Genres</h3>
        {genres.map((genre) => (
          <div key={genre}   className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={selectedGenres.includes(genre)}
              onCheckedChange={(checked) =>
                setSelectedGenres(checked ? [...selectedGenres, genre] : selectedGenres.filter((g) => g !== genre))
              }
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{genre}</span>
          </div>
        ))}
      </div>
      <Separator className="my-4" />

      {/* Production Country */}
      <div  className="mb-6">
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">Production Country</h3>
        {countries.map((country) => (
          <div key={country}   className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={selectedCountries.includes(country)}
              onCheckedChange={(checked) =>
                setSelectedCountries(checked ? [...selectedCountries, country] : selectedCountries.filter((c) => c !== country))
              }
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{country}</span>
          </div>
        ))}
      </div>
      <Separator className="my-4" />

      {/* Release Year */}
      <div  className="mb-6">
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">Release Year</h3>
        <Slider value={releaseYear} onValueChange={setReleaseYear} min={1950} max={2024} step={1} />
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{releaseYear[0]} - {releaseYear[1]}</p>
      </div>
      <Separator className="my-4" />

      {/* Minimum Rating */}
      <div  className="mb-6">
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">Minimum Rating</h3>
        <Slider value={[minRating]} onValueChange={(value) => setMinRating(value[0])} min={0} max={10} step={0.5} />
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{minRating} / 10</p>
      </div>
      <Separator className="my-4" />

      {/* Sorting */}
      <div  className="mb-6">
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">Sort By</h3>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          {sortOptions.map((option) => (
            <div key={option}   className="flex items-center gap-3 mb-2">
              <RadioGroupItem value={option} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option}</span>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div  className="mt-6">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all">
          Apply Filters 🎬
        </Button>
      </div>
    </div>
  );
}
