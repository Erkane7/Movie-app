import Footer from "../components/Footer";
import Header from "../components/Header";
import { MovieCarousel } from "../components/MovieCarousel";
import { Upcoming } from "../components/Upcoming";
import { Popular } from "../components/Popular";
import { TopRated } from "../components/Toprated";
import { useEffect, useState } from "react";

export default function Home() {
  const [nowPlayingMovie, setNowPlayingMovies] = useState([]);
  const getNowPlayingMovies = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/now_playing?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      const movies = await responce.json();
      setNowPlayingMovies(movies.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div className="mr-10">
      <Header />
      <MovieCarousel nowPlayingMovie={nowPlayingMovie} />
      <Upcoming />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
