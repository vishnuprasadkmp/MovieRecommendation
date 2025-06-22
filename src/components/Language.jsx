import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Language.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Language = ({ favorites, toggleFavorite }) => {
  const [moviesByLanguage, setMoviesByLanguage] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:1000/Movies');
        const movies = res.data.Movies || res.data;

        // Group movies by language
        const grouped = movies.reduce((acc, movie) => {
          if (!acc[movie.language]) {
            acc[movie.language] = [];
          }
          acc[movie.language].push(movie);
          return acc;
        }, {});

        setMoviesByLanguage(grouped);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="language-section">
      {Object.entries(moviesByLanguage).map(([language, movies]) => (
        <div className="language-card" key={language}>
          <h3 className="language-heading">{language}</h3>
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <img src={movie.poster_url} alt={movie.moviename} className="poster" />
                <h4>{movie.moviename}</h4>
                <p>⭐ {movie.rating} | 👍 {movie.recommendation}%</p>
                <p>📅 {movie.released_year}</p>
                <p className="platform">📺 {movie.platform}</p>
                <button
                  className="fav-btn"
                  onClick={() => toggleFavorite(movie.moviename)}
                  title="Toggle Favorite"
                >
                  {favorites.includes(movie.moviename) ? (
                    <FavoriteIcon style={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Language;
