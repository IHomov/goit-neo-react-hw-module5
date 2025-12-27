// src/pages/HomePage/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.themoviedb.org/3/trending/movie/day', {
        params: {
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
  }, []);

  return (
    <div>
      <h1>Trending Movies Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
