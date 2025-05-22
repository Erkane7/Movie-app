import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MovieDescription } from "@/components/MovieDescription";
import { MovieFrame } from "@/components/MovieFrame";
import { MoreLikeMovie } from "@/components/MovieMoreLike";
import { getMovieById } from "@/servecis/getMovieById";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const movieId = router.query.movieId;
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const data = await getMovieById(movieId);
    setMovie(data);
  };
  useEffect(() => {
    if (!movieId) return;
    getMovie();
  }, [movieId]);

  return (
    <div>
      <Header />
      <MovieFrame movie={movie} poster_path={movie.poster_path} backdrop_path={movie.backdrop_path} />
      <MovieDescription movie={movie} id={movieId} />
      <MoreLikeMovie id={movieId} />
      <Footer />
    </div>
  );
}
