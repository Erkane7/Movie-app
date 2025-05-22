import { ArrowRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";

export const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const getTopRated = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/top_rated?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      const movies = await responce.json();
      setTopRated(movies.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopRated();
  }, []);
  return (
    <div className="w-full flex justify-center px-4 mt-12 mb-12">
      <div className="max-w-7xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Toprated</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 cursor-pointer">
            <span>See more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topRated.slice(0, 10).map((movie, index) => (
            <MovieCard
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
