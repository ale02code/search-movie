const KEY_OMDB_API = "d3769c7";

export async function searchMovies({ search }) {
  if (search === '') return null;

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY_OMDB_API}&s=${search}`)
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }));
  } catch (error) {
    throw new Error('Failed to fetch');
  }
}