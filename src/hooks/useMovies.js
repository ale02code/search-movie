import { searchMovies } from "../services/movie";
import { useMemo, useRef, useState, useCallback } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const retrySearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === retrySearch.current) return;

    try {
      setLoading(true);
      setError(null);
      retrySearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.massage);
    } finally {
      setLoading(false);
      console.log("fetching movies finished");
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}