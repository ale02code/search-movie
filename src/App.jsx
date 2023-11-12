import { useCallback, useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import Movies from "./components/Movies";
import debounce from "just-debounce-it";
import "./App.css";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, errorSearch } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    ({ search }) => {
      debounce((search) => {
        getMovies({ search });
      }, 300);
    },
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newMovie = event.target.value;
    updateSearch(event.target.value);
    getMovies({ search: newMovie });
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "default") {
      setSort(false);
    }

    if (selectedValue === "sort-on") {
      setSort(true);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1>Search movies here</h1>
        <form className="page__header__form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="search"
            title="Complete this field"
            autoFocus="on"
            type="text"
            placeholder="Star wars, iron man..."
          />
          <select name="sort-movies" onChange={handleSortChange}>
            <option value="default">Def</option>
            <option value="sort-on">A-Z</option>
          </select>
          <button type="submit">Search</button>
        </form>

        {errorSearch && (
          <p style={{ color: "red", textAlign: "center" }}>{errorSearch}</p>
        )}
      </header>

      <main className="page__main">
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
