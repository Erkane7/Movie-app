export const getMovieById = async (movieId) => {
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );
    const movies = await responce.json();
    return movies;
  } catch (error) {
    console.log(error);
  }
};
