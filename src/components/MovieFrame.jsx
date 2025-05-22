import { Play, Star } from "lucide-react";
import Image from "next/image";

export const MovieFrame = ({ movie, poster_path }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden ml-30 mt-10 w-[1080px] h-[520px]">
      <div className="flex justify-between  ">
        <div>
          <p className="font-bold">{movie?.title}</p>
          <span></span>
          <span></span>
          <span>{movie?.runtime}</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm">Rating:</p>
          <div className="flex gap-3">
            <Star className="text-yellow-400" />
            <span className="text-gray-900 text-sm ">
              <span className="font-bold">{movie?.vote_average}</span>
              <span>/10</span>
              <p>{movie?.vote_count}</p>
            </span>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={290}
          height={430}
          alt="Poster picture"
        />
        <div className="absolute w-full overflow-hidden">
          {/* <Video /> */}
          <div className="absolute top-[360px] left-[24px] flex ">
            <Play />
            <span>Play trailer</span>
            <span>Duration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
