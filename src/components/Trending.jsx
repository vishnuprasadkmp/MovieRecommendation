import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Trending.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Trending = ({ favorites, toggleFavorite }) => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('http://localhost:1000/Trending');
        setTrending(res.data.Trending || res.data);
      } catch (error) {
        console.error('Failed to fetch trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return <div className="trending-container">Loading...</div>;
  }

  return (
    <div className="trending-container">
      <h2 className="trending-title"> Trending Movies</h2>
      <div className="trending-grid">
        {trending.map((movie, index) => (
          <div className="trending-card" key={index}>
            <img src={movie.poster_url} alt={movie.moviename} className="poster" />
            <h3>{movie.moviename}</h3>
            <p>⭐ {movie.rating} | 👍 {movie.recommendation}%</p>
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
  );
};

export default Trending;
