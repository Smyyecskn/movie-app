import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useAuthContext } from "../context/AuthProvider";

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const [search, setSearch] = useState("");
  const { currentUser } = useAuthContext();

  const API_KEY = "96cb1c1d66e0fe86566302097d93016d";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search && currentUser) {
      getMovies(SEARCH_API);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify(`Please enter a text`);
    }
  };
  return (
    <div>
      <form className="flex justify-center p-2 mt-12" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      ;
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>{" "}
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </div>
  );
};

export default Main;
