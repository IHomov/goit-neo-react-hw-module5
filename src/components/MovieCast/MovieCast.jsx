// src/components/MovieCast/MovieCast.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading cast...</p>}
      {error && <p>{error}</p>}
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <div>
          <h2>Cast</h2>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  style={{ width: '100px', height: '150px' }}
                />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieCast;
