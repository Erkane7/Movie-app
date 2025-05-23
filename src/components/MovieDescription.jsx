import { useEffect, useState } from "react";

export const MovieDescription = ({ movie, id }) => {
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);

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
      setCast(data.cast || []);

      const directors =
        data.crew?.filter((person) => person.job === "Director") || [];
      const writers =
        data.crew?.filter(
          (person) => person.job === "Writer" || person.department === "Writing"
        ) || [];

      setDirector(directors);
      setWriter(writers);
    } catch (error) {
      console.error("Failed to fetch movie description:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getMovieDescription();
  }, [id]);

  return (
    <div className="flex flex-col mx-auto rounded-lg shadow-md mt-10 max-w-[1280px] gap-5 p-4">
      <div className="mb-4">
        <h2 className="text-2xl text-sky-800">
          {movie?.genres?.map((genre) => genre.name).join(" · ")}
        </h2>
      </div>
      <p className="mb-6">{movie?.overview}</p>

      {director.length > 0 && (
        <div className="flex gap-8 ">
          <h3 className="text-xl font-bold">Director</h3>
          <div className="flex gap-4 mt-0.5">
            {director.map((director) => (
              <p key={director.id}> {director.name} </p>
            ))}
          </div>
        </div>
      )}

      {writer.length > 0 && (
        <div className="flex gap-8 mt-4 ">
          <h3 className="text-xl font-bold">Writers</h3>
          <div className="flex gap-4 mt-0.5 ml-2">
            {writer.map((writer) => (
              <p key={writer.id}> {writer.name} </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-8 mt-4">
        <h3 className="text-xl font-bold">Stars </h3>
        <div className="flex gap-4 mt-0.5 ml-6">
          {cast.slice(0, 3).map((actor) => (
            <div key={actor.cast_id}>
              <p className="font-medium">{actor.name} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
