import { getSearchId } from "@/services/getSearchId";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 нэмсэн

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

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-gray-200 rounded-xl px-4 py-2 shadow-lg w-full md:w-[500px]"
      />

      {loading && (
        <div className="absolute z-10 w-full bg-white p-4 rounded-xl mt-2 shadow-md space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-[67px] h-[100px] rounded-xl" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-[300px] h-6" />
                <Skeleton className="w-[100px] h-4" />
                <Skeleton className="w-[200px] h-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="absolute z-10 w-full bg-white p-4 rounded-xl mt-2 shadow-md max-h-[400px] overflow-y-auto">
          {results.slice(0, 6).map((movie) => {
            const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movie.poster_path}`;
            return (
              <div key={movie.id} className="flex gap-4 py-2 border-b">
                <Link href={`/details/${movie.id}`}>
                  <img
                    src={posterUrl}
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
                    <Star
                      color="rgba(253, 224, 71, 1)"
                      fill="rgba(253, 224, 71, 1)"
                      className="w-4"
                    />
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
