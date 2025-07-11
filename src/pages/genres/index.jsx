import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { parseAsInteger, useQueryState } from "nuqs";
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
import { getGenreId } from "@/services/getGenreId";
import { GenreNames } from "@/components/GenreNames";

export default function CategorMorePage() {
  const router = useRouter();
  const { genreId, name } = router.query;
  const [genre, setGenre] = useState({});
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    if (page < 1) setPage(1);
    const fetchData = async () => {
      if (!genreId) return;
      const data = await getGenreId(genreId, page);
      setGenre(data);
    };

    fetchData();
  }, [genreId, page]);

  return (
    <div>
      <Header />
      <h1 className="flex mt-15 ml-30 text-2xl font-bold">Search filter:</h1>
      <h1 className="ml-12 mt-10 text-xl font-bold">Genres</h1>
      <div className="w-full flex mt-10 gap-8 ml-10">
        <GenreNames className="mt-25" />
        <div className="border-1 max-h-full mx-auto "></div>
        <div className="max-w-6xl w-full flex flex-col gap-6 mr-10">
          <h1 className="font-bold text-2xl">
            {genre?.total_results} titles in "{name}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-auto">
            {genre?.results?.map((movie) => (
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
      <div className="mt-20">
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
              if (pageNum < 1 || pageNum > genre?.total_pages) return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink href="#" onClick={() => setPage(pageNum)}>
                    <Button
                      className={
                        pageNum === page
                          ? "bg-gray-400 text-black  dark:text-white"
                          : "bg-gray-200 text-black dark:text-white"
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
                  if (page + 1 < genre?.total_pages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}
