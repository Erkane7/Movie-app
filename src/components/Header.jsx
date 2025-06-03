import React, { useState, useEffect } from "react";
import { Film, Moon, Sun, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeadGenre } from "./HeadGenre";
import { SearchInput } from "./SearchInput";
import { ModeToggle } from "./Darkmode";

const Header = () => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className=" h-9 px-4 mt-4 bg-white dark:bg-gray-900 ">
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 cursor-pointer">
            <Film />
            <span className="font-bold italic text-lg">Movie Z</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <HeadGenre />

          <div className="relative w-[379px] h-9 sm:block hidden">
            <SearchInput className="absolute left-3 top-1.5 text-gray-400 dark:text-gray-300">
              <Search className="bg-amber-200" />
            </SearchInput>
          </div>
        </div>

        <div className="flex gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
