import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDownNarrowWide } from "lucide-react";
import { GenreNames } from "./GenreNames";

const Palindrom = (x) => {
  const input = x.toString();
  input = input.split("").reverse().join("") ? true : false;
};

x[i];

export function HeadGenre() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownNarrowWide className="mr-2" />
          Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-5 w-100">
        <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <GenreNames />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
