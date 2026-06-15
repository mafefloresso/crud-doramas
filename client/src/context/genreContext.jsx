import { createContext, useContext, useState } from "react";

import { getGenresRequest } from "../api/genres";

const GenreContext = createContext();


export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context)
    throw new Error("useGenres must be used within a GenreProvider");
  return context;
};


export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    try {
      const res = await getGenresRequest();
      setGenres(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GenreContext.Provider value={{ genres, getGenres }}>
      {children}
    </GenreContext.Provider>
  );
};