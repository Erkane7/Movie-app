import { useEffect, useState } from "react";
import { getGenres } from "@/services/getGenres";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export function GenreNames() {
  const router = useRouter();
  const { genreId, name } = router.query;
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const getGenreTitle = async () => {
      const response = await getGenres();
      setGenres(response?.genres || []);
    };
    getGenreTitle();
  }, []);

  const toggleGenre = (id, name) => {
    setSelectedGenres((prev) => {
      const genreId = prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id];

      router.push(`/genres?genreId=${genreId.join(",")}&name=${name}`);

      return genreId;
    });
  };

  return (
    <div>
      <div className="mt-10 mx-10">
        <h1 className="text-xl font-bold">Genres</h1>
        <h2>See lists of movies by genre</h2>
        <div className="mt-5 px-auto gap-3 flex flex-wrap max-w-90">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              className={`flex border rounded-full cursor-pointer hover:bg-gray-300 ${
                selectedGenres.includes(genre.id)
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleGenre(genre.id, genre.name)}
            >
              {genre.name}
              <ArrowRight className="h-3 mt-0.5 ml-0.5" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
