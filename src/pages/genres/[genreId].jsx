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
import { GenreName } from "@/components/Genre";
import { GenreNames } from "@/components/GenreNames";

export default function CategorMorePage() {
  const router = useRouter();
  const { genreId } = router.query;

  const [genre, setGenre] = useState([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchData = async () => {
      if (!genreId) return;
      const data = await getGenreId(genreId, page);
      console.log(data);
      setGenre(data?.results);
    };

    fetchData();
  }, [genreId, page]);
  console.log(genre);
  return (
    <div>
      <Header />
      <div className="w-full flex mt-12">
        <GenreNames />
        <div className="max-w-6xl w-full mt-20 flex flex-col gap-6">
          <h1 className="font-bold">
            {}titles in "{genre.id} "
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {genre.map((movie) => (
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
                <PaginationLink href="#" onClick={() => setPage(pageNumber)}>
                  <Button variant={pageNumber === page ? "default" : "outline"}>
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
      <Footer />
    </div>
  );
}
