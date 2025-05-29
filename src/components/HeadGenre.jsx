import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGenres } from "@/services/getGenres";
import { Button } from "./ui/button";
import { ArrowDownNarrowWide, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export function HeadGenre() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenreTitle = async () => {
      const response = await getGenres();
      setGenres(response?.genres || []);
    };
    getGenreTitle();
  }, []);

  const handleSelectGenre = (id, name) => {
    router.push(`/genres?genreId=${id}&name=${name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownNarrowWide className="mr-2" />
          Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {genres.map((genre) => (
          <DropdownMenuItem
            key={genre.id}
            className="flex cursor-pointer items-center max-w-60 hover:bg-gray-200"
            onSelect={() => handleSelectGenre(genre.id, genre.name)}
          >
            {genre.name}
            <ArrowRight className="h-3 mt-0.5" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
