import { ArrowRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getUpComingMovies } from "@/services/getUpComingMovies";

export const Upcoming = () => {
  const [upComingMovie, setUpComingMovies] = useState([]);

  useEffect(() => {
    const getUpComing = async () => {
      const responce = await getUpComingMovies();
      setUpComingMovies(responce?.results);
    };
    getUpComing();
  }, []);
  
  return (
    <div className="w-full flex justify-center px-4 mt-12">
      <div className="max-w-7xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Upcoming</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 cursor-pointer">
            <span>See more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {upComingMovie.slice(0, 10).map((movie, index) => (
            <MovieCard
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
