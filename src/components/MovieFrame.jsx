import { Play, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Trailer from "./Trailer";
// import { DialogTitle } from "./ui/dialog";

export const MovieFrame = ({ movie, poster_path, backdrop_path, id }) => {
  const [video, setVideo] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getTrailer = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setVideo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getTrailer();
  }, [id]);

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
                  : "N/A"}
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
          <button
            onClick={() => setShowTrailer(!showTrailer)}
            className="absolute bottom-4 left-8 flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 hover:bg-gray-100 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Play />
            <span>Watch Trailer</span>
          </button>
          {/* <DialogTitle> */}
          {showTrailer && (
            <div className="absolute top-0 right-40 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-10">
              <div className="relative">
                <button
                  onClick={() => setShowTrailer(false)}
                  className="absolute -top-4 -right-4 text-white bg-black rounded-full p-1"
                ></button>

                <Trailer id={id} />
              </div>
            </div>
          )}
          {/* </DialogTitle> */}
        </div>
      </div>
    </div>
  );
};
