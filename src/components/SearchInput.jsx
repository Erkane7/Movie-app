import { getSearchId } from "@/services/getSearchId";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./Skelton";
import { Skeleton } from "./ui/skeleton";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && results.length > 0) {
      router.push(`/details/${results[0].id}`);
    }
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const getDelay = setTimeout(() => {
      setLoading(true);
      const fetchSearch = async () => {
        try {
          const response = await getSearchId(query);
          setResults(response?.results || []);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearch();
    }, 300);

    return () => clearTimeout(getDelay);
  }, [query]);

  if (loading)
    return (
      <div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex gap-4 py-2 border-b rounded-2xl w-[500px]">
            <Skeleton width={67} height={200} borderRadius={12} />
            <div className="flex flex-col justify-between w-full">
              <Skeleton height={50} width="80%" />
              <div className="flex items-center gap-2">
                <Skeleton circle width={16} height={16} />
                <Skeleton width={40} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-gray-200 rounded-xl px-4 py-2 shadow-lg w-full md:w-[500px] dark:text-balck"
      />

      {!loading && results.length > 0 && (
        <div className="absolute z-10  md:w-[500px] bg-white p-4 dark:text-white dark:bg-black rounded-xl mt-2 shadow-md max-h-[400px] overflow-y-auto">
          {results.slice(0, 5).map((movie) => {
            return (
              <div
                key={movie.id}
                className="flex gap-4 py-2 border-b  rounded-2xl"
              >
                <Link href={`/details/${movie.id}`}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[67px] h-[100px] rounded-xl cursor-pointer"
                  />
                </Link>
                <div className="flex flex-col justify-between w-full">
                  <Link href={`/details/${movie.id}`}>
                    <p className="text-[18px] font-semibold cursor-pointer">
                      {movie.title}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star color="yellow" fill="orange" className="w-4" />
                    <span className="font-semibold">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{movie.release_date}</span>
                    <Link href={`/details/${movie.id}`}>
                      <div className="flex items-center hover:text-blue-600 transition">
                        <p>See more</p>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="absolute z-10 w-full bg-white p-4 rounded-xl mt-2 shadow-md">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};
