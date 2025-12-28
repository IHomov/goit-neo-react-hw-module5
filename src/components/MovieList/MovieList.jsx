import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies, showImage = true }) => {
const location = useLocation();

  const getMovieTitleWithYear = (title, releaseDate) => {
    const year = releaseDate ? new Date(releaseDate).getFullYear() : ''; 
    return year ? `${title} (${year})` : title; 
  };

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <h2>{getMovieTitleWithYear(movie.title, movie.release_date)}</h2> 
            {showImage && movie.poster_path && (
              <img className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
