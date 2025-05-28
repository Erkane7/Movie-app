import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMoreMovies } from "@/services/getMoremovies";
import { parseAsInteger, useQueryState } from "nuqs";

export default function CategorMorePage() {
  const router = useRouter();
  const { id } = router.query;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getMoreMovies(id, page);
      console.log(data);
      setMovies(data?.results);
    };

    fetchData();
  }, [id, page]);

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center px-4 mt-12">
        <div className="max-w-7xl w-full flex flex-col gap-6">
          <h1 className="text-xl font-bold">More like this</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            ))}
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => {
                      if (page > 1) setPage(page - 1);
                    }}
                  />
                </PaginationItem>

                {[1, 2, 3].map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(pageNumber)}
                    >
                      <Button
                        variant={pageNumber === page ? "default" : "outline"}
                      >
                        {pageNumber}
                      </Button>
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext href="#" onClick={() => setPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
