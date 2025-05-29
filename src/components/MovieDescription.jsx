import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

export const MovieDescription = ({ movie, id }) => {
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);
  const router = useRouter();
  const { genreId, name } = router.query;
    const [selectedGenres, setSelectedGenres] = useState([]);


  const getMovieDescription = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/credits?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      setCast(data.cast);
      console.log(data);
      const directors = data.crew?.filter(
        (person) => person.job === "Director"
      );
      setDirector(directors);

      const writers = data.crew?.filter(
        (person) => person.department === "Writing"
      );
      setWriter(writers);
    } catch (error) {
      console.error("Failed to fetch movie description:", error);
    }
  };

  const toggleGenre = (id, name) => {
    setSelectedGenres((prev) => {
      const genreId = prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id];

      router.push(`/genres?genreId=${genreId.join(",")}&name=${name}`);

      return genreId;
    });
  };

  useEffect(() => {
    if (!id) return;
    getMovieDescription();
  }, [id]);

  return (
    <div className="flex flex-col mx-auto rounded-lg shadow-md mt-10 max-w-[1280px] gap-5 p-4">
      <div className="mb-4">
        <h2 className="text-2x">
          {movie?.genres?.map((genre) => (
            <Button
              key={genre.id}
              asChild
              variant="outline"
              className="rounded-full mx-2 text-black"
            >
              <Button onClick={() => toggleGenre(genre.id, genre.name)}>{genre.name}</Button>
            </Button>
          ))}
        </h2>
      </div>
      <p className="mb-6">{movie?.overview}</p>

      <div className="flex gap-8 ">
        <h3 className="text-xl font-bold">Director</h3>
        <div className="flex gap-4 mt-0.5">
          {director.map((director) => (
            <p>{director.name} </p>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-4 ">
        <h3 className="text-xl font-bold">Writers</h3>
        <div className="flex gap-4 mt-0.5 ml-2">
          {writer.slice(0, 3).map((writer) => (
            <p>{writer.name} </p>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-4">
        <h3 className="text-xl font-bold">Stars </h3>
        <div className="flex gap-4 mt-0.5 ml-6">
          {cast.slice(0, 3).map((star) => (
            <p>{star.name} </p>
          ))}
        </div>
      </div>
    </div>
  );
};
