import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MovieCard = ({ title, vote_average, poster_path, id }) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="rounded-lg shadow-md overflow-hidden w-full max-w-[240px] h-[440px] cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
        <Image
          priority={true}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={240}
          height={330}
          alt={`${title}poster`}
        />
        <div className="bg-gray-100 px-4 py-1 h-full dark:bg-gray-900">
          <p className="flex items-center text-sm text-gray-900 dark:text-white">
            <Star className="text-yellow-500 mr-1" size={16} />
            <span className="font-semibold  dark:text-white">
              {vote_average.toFixed(1)}
            </span>
            <span className="text-gray-500 ml-1 dark:text-gray-100">/10</span>
          </p>
          <h2 className="text-md font-medium mt-1 dark:text-white">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
