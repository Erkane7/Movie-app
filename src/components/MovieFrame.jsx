import { Play, Star } from "lucide-react";
import Image from "next/image";

export const MovieFrame = ({ movie, poster_path ,backdrop_path}) => {

  return (
 <div className="flex flex-col  mx-auto  mt-12 rounded-lg shadow-md overflow-hidden mt-10 max-w-[1280px]">
      <div className="flex justify-between  px-2 ">
        <div>
          <p className="font-bold text-4xl ">{movie?.title}</p>
          <span>{movie?.release_date}</span>
          {/* <span>{movie?.adult}</span> */}
          <span> · {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-lg">Rating:</p>
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
        <div className="flex gap-6" >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={290}
          height={430}
          alt="Poster picture"
        />  
        <div>
        <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
        width={1000}
        height={430}
        alt="Poster picture"
      />   <div className="absolute top-[610px] left-[524px] text-white flex gap-2 text-xl">
      <Play className="border rounded-4xl \"/>
      <span>Play trailer</span>
      <span></span>
    </div>
        </div>
        </div>
      </div>
    </div>
   
  );
};
