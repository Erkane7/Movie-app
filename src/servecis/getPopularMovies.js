// import { useEffect, useState } from "react";

// export const getPopularMovies = async () => {
//   const [popularMovie, setPopularMovies] = useState([]);
//   try {
//     const responce = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//         },
//       }
//     );
//     const movies = await responce.json();
//     setPopularMovies(movies.results);
//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(() => {
//   getPopularMovies();
// }, []);
