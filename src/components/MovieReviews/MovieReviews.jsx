import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css'; 
const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY, 
        },
      })
      .then((response) => {
        setReviews(response.data.results); 
      })
      .catch(() => {
        setError('Failed to load reviews data');
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h3>Reviews</h3>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      
      {!loading && reviews.length === 0 && (
        <p className={styles.noReviews}>We don't have any reviews for this movie.</p>
      )}

      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <strong className={styles.author}>Author: {review.author}</strong>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;