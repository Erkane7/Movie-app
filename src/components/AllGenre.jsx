import { useEffect, useState } from "react";
import { getGenres } from "@/services/getGenres";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export function GenreNames() {
  const router = useRouter();
  const { genreId, name } = router.query;
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({
    ids: [],
    names: [],
  });

  useEffect(() => {
    const getGenreTitle = async () => {
      const response = await getGenres();
      setGenres(response?.genres || []);
    };
    getGenreTitle();
  }, []);

  useEffect(() => {
    if (genreId && name) {
      const ids = genreId.split(",").map((id) => Number(id));
      const names = name.split(", ");
      setSelectedGenres({ ids, names });
    }
  }, [genreId, name]);

  const toggleGenre = (id, name) => {
    setSelectedGenres((prev) => {
      const getSelected = prev.ids.includes(id);

      const newIds = getSelected
        ? prev.ids.filter((genreId) => genreId !== id)
        : [...prev.ids, id];

      const newNames = getSelected
        ? prev.names.filter((genreName) => genreName !== name)
        : [...prev.names, name];

      router.push(`/genres?genreId=${newIds.join(",")}&name=${newNames.join(", ")}`);

      return {
        ids: newIds,
        names: newNames,
      };
    });
  };

  return (
    <div>
      <div className="mt-10 mx-10">
        <h1 className="text-xl font-bold">Genres</h1>
        <h2>See lists of movies by genre</h2>
        <div className="mt-5 mx-auto gap-3 flex flex-wrap max-w-90">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              className={`flex items-center border rounded-full cursor-pointer hover:bg-gray-300 ${
                selectedGenres.ids.includes(genre.id)
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleGenre(genre.id, genre.name)}
            >
              {genre.name}
              <ArrowRight className="h-3 mt-0.5 ml-1" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
