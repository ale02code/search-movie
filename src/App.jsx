import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import Movies from "./components/Movies";
import "./App.css";

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, errorSearch } = useSearch();
  const [testSearch, setTestSearch] = useState("");

  const handleChange = (event) => {
    setTestSearch(event.target.value);

    // const newSearch = event.target.value;
    // updateSearch(newSearch);
    // console.log(search);
  };

  useEffect(() => {
    const API_KEY_MOVIES = "d3769c7";
    const API_URL_MOVIES = `http://www.omdbapi.com/?apikey=${API_KEY_MOVIES}&s=${testSearch}`;

    fetch(API_URL_MOVIES)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          return console.info("No movies found");
        }

        console.log(data);
      });

    console.log(testSearch);
  }, [testSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
