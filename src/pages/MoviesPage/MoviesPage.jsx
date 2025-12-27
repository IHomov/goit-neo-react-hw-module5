import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css'; 

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          query: searchQuery,
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(() => {
        setError('Something went wrong. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim();

    if (value === "") {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: value });
  };

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>Search Movies</h1>
      
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          className={styles.searchInput}
          placeholder="Search for movies..."
          defaultValue={searchQuery}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && movies.length === 0 && searchQuery && (
        <p className={styles.message}>No movies found. Please try another search.</p>
      )}
      
      
      <MovieList movies={movies} showImage={false} />
    </div>
  );
};

export default MoviesPage;