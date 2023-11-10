import responseMovies from "../mocks/prev-results.json";
import errorResponseMovies from "../mocks/prev-results-error.json";
import { useState } from "react";

export function useMovies({ search }) {
  const [responsiveMovies, setResponsiveMovies] = useState([]);
  const movies = responsiveMovies?.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }));

  function getMovies() {
    if (search) {
      fetch(`http://www.omdbapi.com/?apikey=d3769c7&s=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setResponsiveMovies(data);
        })
    } else {
      setResponsiveMovies(errorResponseMovies);
      console.log(errorResponseMovies)
    }
  }

  return { movies: mappedMovies, getMovies };
}