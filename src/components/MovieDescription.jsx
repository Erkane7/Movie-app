import { useEffect, useState } from "react";

export const MovieDescription = ({ movie, id }) => {
  const [cast, setCast] = useState([]);

  const getMovieDescription = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/credits?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      const castList = await response.json();
      setCast(castList.cast);

    } catch (error) {
      console.log(error);
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

      <div className="flex gap-8">
        <h3 className="text-xl font-bold ">Stars</h3>
        <div className="flex gap-4 mt-0.5">
          {cast.slice(0, 3).map((actor) => (
              <div key={actor.cast_id} className="w-32">
                <p className="font-medium">-{actor.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
