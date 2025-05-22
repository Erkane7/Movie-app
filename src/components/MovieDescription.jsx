import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";

export const MovieDescription = ({ movie , id}) => {
    const [movieDescription, setMovieDescription] = useState([]);
    const getMovieDescription = async () => {
      try {
        const responce = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
        const movies = await responce.json();
        setMovieDescription(movies.results);
        console.log(movies);
        
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (!id) return
      getMovieDescription();
    }, [id]);

    
  return (
    <div className="flex flex-col mx-auto rounded-lg shadow-md mt-10 max-w-[1280px] h-[271px] gap-5">
      <div className="flex ">
        <span className="flex  items-center bg-gray-200 border rounded-4xl">
          {movie?.title}
        </span>
      </div>
      <div>{movie?.overview}</div>
    </div>
  );
};
