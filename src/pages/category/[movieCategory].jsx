import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { getCategory } from "@/services/getCategory";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const { movieCategory } = router.query;
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchCategory = async () => {
      if (!movieCategory) return;
      const data = await getCategory(movieCategory, page);

      setCategories(data?.results);
    };

    fetchCategory();
  }, [movieCategory, page]);

  // console.log(currentPage);

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center px-4 mt-12">
        <div className="max-w-7xl w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {(movieCategory === "upcoming" && "Upcoming") ||
                (movieCategory === "popular" && "Popular") ||
                (movieCategory === "top_rated" && "Top rated")}
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((movie) => (
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
            <Pagination className="gap-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => {
                      if (page > 1) setPage(page - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: 4 }, (_, i) => {
                  const pageNum = page - 1 + i;
                  if (pageNum < 1 || pageNum > categories?.total_pages)
                    return null;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink href="#" onClick={() => setPage(pageNum)}>
                        <Button
                          className={
                            pageNum === page
                              ? "bg-gray-300 text-black border-none"
                              : "bg-white text-black border-none"
                          }
                          variant={pageNum === page ? "default" : "outline"}
                        >
                          {pageNum}
                        </Button>
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => {
                      if (page + 1 < categories?.total_pages) setPage(page + 1);
                    }}
                  />
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
