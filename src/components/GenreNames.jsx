import { useEffect, useState } from "react";
import { getGenres } from "@/services/getGenres";
import { Button } from "./ui/button";
import { ArrowDownNarrowWide, ArrowRight } from "lucide-react";
import Link from "next/link";

export function GenreNames() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenreTitle = async () => {
      const response = await getGenres();
      setGenres(response?.genres);
    };
    getGenreTitle();
  }, []);
  return (
    <div>
      <h1 className="flex pl-10 text-2xl font-bold">Search filter:</h1>
      <div className="mt-10 mr-10 pl-10 ">
        <h1 className="text-xl font-bold">Genres</h1>
        <h2>See lists of movies by genre</h2>
        <div className="mt-5 px-auto gap-3 flex flex-wrap max-w-90">
          {genres.map((genre) => (
            <Link href={`/genres/${genre.id}`}>
              <button
                key={genre.id}
                className="flex border cursor-pointer rounded-full"
              >
                {genre.name}
                <ArrowRight className="h-3 mt-1.5" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
