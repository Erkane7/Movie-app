import { useEffect, useState } from "react";
import { getGenres } from "@/services/getGenres";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";

export function GenreNames() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  const [genreIds, setGenreIds] = useQueryState(
    "genreIds",
    parseAsArrayOf(parseAsInteger).withDefault([])
  );

  useEffect(() => {
    const getGenreTitle = async () => {
      setLoading(true);
      const response = await getGenres();
      setGenres(response?.genres || []);
      setLoading(false);
    };
    getGenreTitle();
  }, []);

  const toggleGenre = (id, name) => {
    const isSelected = genreIds.includes(id);
    const newIds = isSelected
      ? genreIds.filter((genreId) => genreId !== id)
      : [...genreIds, id];
    setGenreIds(newIds);

    const selectedNames = genres
      .filter((genre) => newIds.includes(genre.id))
      .map((genre) => genre.name);

    router.push(
      `/genres?genreId=${newIds.join(",")}&name=${selectedNames.join(", ")}`
    );
  };

  return (
    <div className="mx-auto ml-2">
      <h2>See lists of movies by genre</h2>

      <div className="mt-5 mx-auto gap-3 flex flex-wrap max-w-110">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-10 w-28 rounded-full bg-gray-200"
              />
            ))
          : genres.map((genre) => {
              const isSelected = genreIds.includes(genre.id);

              return (
                <Button
                  key={genre.id}
                  className={`flex items-center border rounded-full cursor-pointer hover:bg-gray-300 ${
                    isSelected
                      ? "bg-gray-400 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => toggleGenre(genre.id, genre.name)}
                >
                  {genre.name}
                  <ArrowRight className="h-3 mt-0.5 ml-1" />
                </Button>
              );
            })}
      </div>
    </div>
  );
}
