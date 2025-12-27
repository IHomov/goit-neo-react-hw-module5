// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((err) => {
        setError('Failed to fetch movie details.');
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((err) => {
        setError('Failed to fetch movie cast.');
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((err) => {
        setError('Failed to fetch movie reviews.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>User Score: {movie.vote_average * 10}%</p>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <Link to={location.state?.from || '/movies'}>Go back</Link>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
