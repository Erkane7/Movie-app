import { Play, Star } from "lucide-react";
import Image from "next/image";

export const MovieFrame = ({ movie, poster_path, backdrop_path }) => {
  return (
    <div className="flex flex-col mx-auto mt-12 rounded-lg shadow-md overflow-hidden max-w-[1280px] bg-white dark:bg-gray-900">
      <div className="flex justify-between px-4 py-4">
        <div>
          <p className="font-bold text-4xl text-gray-900 dark:text-white">
            {movie?.title}
          </p>
          <span className="text-gray-700 dark:text-gray-300">
            {movie?.release_date}
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {" "}
            · {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
          </span>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <p className="text-lg text-gray-900 dark:text-white">Rating:</p>
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400" />
            <div className="text-gray-900 text-sm dark:text-gray-300">
              <span className="font-bold">
                {typeof movie?.vote_average === "number"
                  ? movie.vote_average.toFixed(1)
                  : "hooson"}
              </span>
              <span>/10</span>
              <p>{movie?.vote_count} votes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 px-4 pb-8 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={290}
          height={430}
          className="rounded-md"
          alt={`${movie?.title} poster`}
        />
        <div className="relative flex-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
            width={1000}
            height={430}
            className="rounded-md object-cover"
            alt={`${movie?.title} backdrop`}
          />
          <button className="absolute bottom-4 left-8 flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 hover:bg-gray-100 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            <Play />
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};
