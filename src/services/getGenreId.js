export const getGenreId = async (genreIds, page = 1) => {
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
      {
        method: "Get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );
    const data = await responce.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
