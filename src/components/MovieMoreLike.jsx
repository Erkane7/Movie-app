import { ArrowRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getMoreMovies } from "@/services/getMoremovies";
import Link from "next/link"; // Next.js-ийн Link ашиглана
import { SkeletonCard } from "./Skelton";

export const MoreLikeMovie = ({ id }) => {
  const [moreLikeMovie, setMoreLikeMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMoreLikeMovie = async () => {
      const response = await getMoreMovies(id);
      setMoreLikeMovie(response?.results);
      setLoading(false);
    };

    if (!id) return;
    getMoreLikeMovie();
  }, [id]);

  if (loading)
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  return (
    <div className="w-full flex justify-center px-4 mt-12">
      <div className="max-w-7xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">More like this</h1>
          <Link href={`/More/${id}`}>
            <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              <span>See more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moreLikeMovie &&
            moreLikeMovie
              .slice(0, 5)
              .map((movie) => (
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
