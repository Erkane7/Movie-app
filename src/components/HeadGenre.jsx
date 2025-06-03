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
import { GenreNames } from "./GenreNames";

export function HeadGenre() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownNarrowWide className="mr-2" />
          Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 ml-5">
        <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <GenreNames />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
