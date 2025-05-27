import { ArrowRight } from "lucide-react";
import Link from "next/link"; // ✅ зөв Link
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/getTopRatedMovies";

export const TopRated = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const getTopRated = async () => {
      const responce = await getTopRatedMovies();
      setTopRated(responce?.results);
    };
    getTopRated();
  }, []);

  return (
    <div className="w-full flex justify-center px-4 mt-12 mb-12">
      <div className="max-w-7xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Toprated</h1>
          <Link href={`/category/top_rated`}>
            <div className="flex items-center gap-6 text-sm text-gray-500 cursor-pointer">
              <span>See more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topRated.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
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
