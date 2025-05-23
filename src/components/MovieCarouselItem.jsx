import React, { useState } from "react";
import { Star, Play, Pointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Trailer from "./Trailer";

const MyCarouselItem = ({
  title,
  vote_average,
  backdrop_path,
  overview,
  id,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="relative w-screen md:h-[600px] lg:h-[900px]">
      <Link
        href={`/details/${id}`}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-100 transition"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
          width={1920}
          height={1000}
          alt="Featured"
          className="object-cover w-full h-full"
        />
      </Link>
      <div className="sm:absolute sm:text-white md:absolute top-80 left-0  flex items-center px-6 sm:px-20 md:px-20">
        <div className="max-w-xl space-y-4">
          <h4 className="text-lg md:text-xl font-light">Now Playing:</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-lg">
            <Star className="text-yellow-400" />
            <span className="text-white text-sm">
              {vote_average.toFixed(1)}/10
            </span>
          </div>
          <p className="text-sm md:text-base text-black-200">{overview}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setShowTrailer(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              <Play /> Watch Trailer
            </button>
          </div>

          {showTrailer && (
            <div className="absolute bottom-0 left-60 bg-black bg-opacity-80 flex items-center justify-center z-10">
              <div className="relative">
                <button
                  onClick={() => setShowTrailer(false)}
                  className="absolute  text-white bg-black rounded-full p-2"
                ></button>
                <Trailer id={id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCarouselItem;
