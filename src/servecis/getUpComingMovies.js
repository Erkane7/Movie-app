// import { useEffect, useState } from "react";

// export const getUpComingMovies = async () => {
//   const [upComingMovie, setUpComingMovies] = useState([]);
//   try {
//     const responce = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//         },
//       }
//     );
//     const movies = await responce.json();
//     setUpComingMovies(movies.results);
//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(() => {
//   getUpComingMovies();
// }, []);
