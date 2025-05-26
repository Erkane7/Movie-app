import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Upcoming } from "@/components/Upcoming";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUpComingMovies } from "@/lib/api"; // Make sure this is the right import path

export default function Page() {
  const router = useRouter();
  const [filter, setFilter] = useState("Upcoming");
  const [upcomingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getUpComingMovies();
      setUpComingMovies(response?.results || []);
    };
    fetchMovies();
  }, []);

  const filteredMovies = upcomingMovies.filter((movie) => {
    if (filter === "Upcoming") {
      return true;
    }
    if (filter === "Toprated") {
      return movie.vote_average >= 8;
    }
    if (filter === "Popular") {
      return movie.popularity > 1000;
    }
    return true;
  });

  return (
    <div>
      <Header />
      <div className="flex gap-4 justify-center my-4">
        {["Upcoming", "Toprated", "Popular"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 border rounded ${
              filter === category ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Upcoming movies={filteredMovies} />

      <Footer />
    </div>
  );
}
