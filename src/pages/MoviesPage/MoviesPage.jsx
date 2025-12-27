// src/pages/MoviesPage/MoviesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          query: query,
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search for movies..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
