import { getSearch } from "@/services/getSearch";
import { useEffect, useState } from "react";

export const SearchMovie = () => {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const getSearchMovie = async () => {
      const responce = await getSearch(searchValue);
      setSearch(responce?.results);
    };
    if (!id) return;
    getSearchMovie();
  }, [id]);
  
  return (
    
)
};

