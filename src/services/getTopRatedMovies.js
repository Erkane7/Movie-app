export const getTopRatedMovies = async () => {
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/top_rated?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );
    return await responce.json();
  } catch (error) {
    console.log(error);
  }
};
