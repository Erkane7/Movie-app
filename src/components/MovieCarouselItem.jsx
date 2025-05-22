import React from "react";
import { Star, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyCarouselItem = ({ title, vote_average, backdrop_path, overview, id }) => {
  return (
    <Link href={`/detials/${id}`}>
    <div className="relative w-full md:h-[600px] lg:h-[700px] overflow-hidden ">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
        width={1900}
        height={600}
        alt="Feutured picture"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center px-6 md:px-20">
        <div className="text-white max-w-xl space-y-4">
          <h4 className="text-lg md:text-xl font-light">Now Playing:</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-lg">
            <Star className="text-yellow-400" />
            <span></span>
            <span className="text-gray-400 text-sm ">
              {vote_average.toFixed(1)}
            </span>
          </div>
          <p className="text-sm md:text-base text-black-200 ">{overview}</p>
          <button className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-100 transition">
            <Play className="bg-black-100" />
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MyCarouselItem;
