import React from "react";

function RenderMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map(({ id, title, year, image }) => (
        <li className="movie" key={id}>
          <img src={image} alt={`Image of ${title}`} />
          <div className="movie__container">
            <div className="movie__container__info">
              <h3>{title}</h3>
              <p>{`It was released in ${year}`}</p>
            </div>
            <div className="movie__container__button">
              <button>PLAY</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function RenderError() {
  return <p>No movies found yet</p>;
}

export default function RenderConditionalData({ movies }) {
  const hasMovies = movies && movies.length > 0;
  return hasMovies ? <RenderMovies movies={movies} /> : <RenderError />;
}
