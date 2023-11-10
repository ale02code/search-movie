import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import Movies from "./components/Movies";
import "./App.css";
import { useEffect } from "react";
function App() {
  const { search, updateSearch, errorSearch } = useSearch();
  const { movies, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
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
            autoComplete="off"
            type="text"
            placeholder="Star wars, iron man..."
          />
          <button type="submit">Search</button>
        </form>

        {errorSearch && (
          <p style={{ color: "red", textAlign: "center" }}>{errorSearch}</p>
        )}
      </header>

      <main className="page__main">
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
