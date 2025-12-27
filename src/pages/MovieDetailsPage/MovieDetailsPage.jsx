import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css'; 

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((response) => setMovie(response.data))
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false));
  }, [movieId]);

  const handleGoBack = () => {
    
    navigate(location.state?.from || '/movies');
  };

  const toggleCast = () => setShowCast(!showCast);
  const toggleReviews = () => setShowReviews(!showReviews);

  if (loading) return <div className={styles.movieDetails}>Loading...</div>;
  if (error) return <div className={styles.movieDetails}>{error}</div>;

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleGoBack} className={styles.backBtn}>
        Go back
      </button>

      {movie && (
        <div className={styles.contentWrapper}>
          <div className={styles.movieDetailsContainer}>
            
           
            <div className={styles.leftSide}>
              {movie.poster_path && (
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              
              <div className={styles.buttonGroup}>
                <button onClick={toggleCast} className={styles.toggleBtn}>
                  {showCast ? 'Hide Cast' : 'Show Cast'}
                </button>
                <button onClick={toggleReviews} className={styles.toggleBtn}>
                  {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </button>
              </div>
            </div>

          
            <div className={styles.rightSide}>
              <h1>{movie.title}</h1>
              <p><strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
            </div>
          </div>

          
          <div className={styles.additionalInfo}>
            {showCast && <MovieCast movieId={movieId} />}
            {showReviews && <MovieReviews movieId={movieId} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;