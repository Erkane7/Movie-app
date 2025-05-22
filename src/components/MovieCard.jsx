import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MovieCard = ({ title, vote_average, poster_path, id }) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="rounded-lg shadow-md overflow-hidden w-full max-w-[240px] h-[440px] cursor-pointer hover:shadow-lg transition-shadow">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={230}
          height={340}
          alt={`${title} poster`}
          style={{ height: "auto" }}
          priority
        />
        <div className="bg-gray-100 px-4 py-3 h-full">
          <p className="flex items-center text-sm">
            <Star className="text-yellow-500 mr-1" size={16} />
            <span className="font-semibold">{vote_average.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">/10</span>
          </p>
          <h2 className="text-md font-medium mt-1">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
