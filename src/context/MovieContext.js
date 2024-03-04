import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = "96cb1c1d66e0fe86566302097d93016d";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies(FEATURED_API);
    // console.log(movies);
  }, []);

  const getMovies = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => setMovies(response.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <MovieContext.Provider value={{ loading, movies, getMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
