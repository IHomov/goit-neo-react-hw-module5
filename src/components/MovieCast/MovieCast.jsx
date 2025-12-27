import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css'; 

const MovieCast = ({ movieId }) => {
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
        setCast(response.data.cast.slice(0, 10)); 
      })
      .catch(() => {
        setError('Failed to load cast data');
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [movieId]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Cast</h3>
      {loading && <p>Loading cast...</p>}
      {error && <p>{error}</p>}
      
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              className={styles.actorImage}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Photo'
              }
              alt={actor.name}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.character}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;