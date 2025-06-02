export const getSearchId = async (searchValue, page = 1) => {
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}search/movie?query=${searchValue}&language=en-US&page=${page}`,
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
