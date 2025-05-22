import React, { useState } from "react";
import { Film, Moon, Sun, Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="h-9 px-4 mt-4">
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-indigo-700 cursor-pointer">
            <Film />
            <span className="font-bold italic text-lg">Movie Z</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className="items-center justify-between gap-2 w-[97px] h-9 px-4 border border-gray-300 rounded-lg sm:block hidden hover:bg-gray-100 cursor-pointer"
          >
            <span>Genre</span>
          </button>

          <div className="relative w-[379px] h-9 sm:block hidden">
            <Search className="absolute left-3 top-1.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full h-full pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="md:hidden lg:hidden gap-2 w-[42px] p-2 px-2 border border-gray-300 rounded-lg"
          >
            <Search />
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 border cursor-pointer"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
