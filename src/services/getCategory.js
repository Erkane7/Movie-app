export const getCategory = async (category, page = 1) => {
  console.log(page);
  try {
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/${category}?language=en-US&page=${page}`,
      {
        method: "GET",
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
