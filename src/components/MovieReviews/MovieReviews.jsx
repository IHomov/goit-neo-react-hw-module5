// src/components/MovieReviews/MovieReviews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const { movieId } = useParams();
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
      .catch((err) => {
        setError('Failed to fetch movie reviews.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
