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
import { ArrowDownNarrowWide } from "lucide-react";
import Link from "next/link";

export function GenreName({ genreIds }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenreTitle = async () => {
      const response = await getGenres();
      // console.log(response);
      setGenres(response?.genres);
    };
    getGenreTitle();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <ArrowDownNarrowWide />
          Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {genres.map((genre) => (
          <Link href={`/genres/${genre.id}`}>
            <DropdownMenuItem
              key={genre.id}
              className="cursor-pointer rounded-full mx-2 "
            >
              {genre.name}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
