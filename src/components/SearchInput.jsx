import { ArrowRight, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

export const SearchInput = ({ movie, queryId }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setValue(event.target.event);
      router.push(`/search/${results.id}`);
    }
  };

  useEffect(() => {
    if (!query) return;
    const getDelay = setTimeout(() => {
      const fetchSearch = async () => {
        try {
          setLoading(true);
          const response = await getSearchId(query);
          console.log("search", response);
          setResults(response?.results || []);
        } catch (error) {
          console.log(error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearch();
    }, 500);

    return () => clearTimeout(getDelay);
  }, [query]);

  console.log(results);
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="border-8 shadow-lg border-transparent rounded-xl md:pr-40 md:pl-6 relative"
      />

      {loading && <p>Searching</p>}

      {!loading && results.length > 2 && (
        <div className="absolute z-10 bg-white border rounded-xl  ">
          {results.slice(0, 6).map((movie) => {
            const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movie?.poster_path} `;
            return (
              <div key={movie.id} className=" text-sm mx-4 my-2   ">
                <button className=" flex max-w-[577px] gap-4 ">
                  <Link href={`/details/${movie.id}`}>
                    <img
                      src={posterUrl}
                      className="w-[67px] h-[100px] rounded-xl cursor-pointer"
                    />
                  </Link>
                  <div className="w-[577px]">
                    <Link href={`/details/${movie.id}`}>
                      <p className="text-[20px] font-[600] flex cursor-pointer">
                        {movie.title}
                      </p>
                    </Link>
                    <div className="flex">
                      <Star
                        color="rgba(253, 224, 71, 1)"
                        fill="rgba(253, 224, 71, 1)"
                        className="w-4"
                      />

                      <p className="font-[600]">
                        {movie.vote_average.toFixed(1)}
                      </p>
                      <p className="text-[#71717a]">/10</p>
                    </div>
                    <div className="flex justify-between py-3">
                      <p>{movie.release_date}</p>
                      <Link href={`/details/${movie.id}`}>
                        <div className="flex cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-150">
                          <p className="text-[14px] font-[500] ">See more</p>
                          <ArrowRight className="w-4 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </button>
                <div className="border-1 my-2"></div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && query && results.length === 0 && <p>No results found</p>}
    </div>
  );
};
