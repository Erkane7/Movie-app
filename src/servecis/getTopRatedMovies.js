// import { useEffect, useState } from "react";

// export const getTopRated = async () => {
//   const [topRated, setTopRated] = useState([]);
//   try {
//     const responce = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/movie/top_rated?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//         },
//       }
//     );
//     const movies = await responce.json();
//     setTopRated(movies.results);
//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(() => {
//   getTopRated();
// }, []);
