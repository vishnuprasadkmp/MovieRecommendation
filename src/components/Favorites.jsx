import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../styles/Favorites.css"; // Make sure to create this file
import HomeIcon from '@mui/icons-material/Home';
const Favorites = ({ favorites }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to /favorites if not already there
  useEffect(() => {
    if (location.pathname !== '/favorites') {
      navigate('/favorites', { replace: true });
    }
  }, [location, navigate]);

  // Fetch all movie data
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get('http://localhost:1000/Movies');
        const movies = res.data.Movies || res.data;
        setAllMovies(movies);
      } catch (error) {
        console.error('Failed to fetch all movies:', error);
      }
    };

    fetchAllMovies();
  }, []);

  // Filter favorites from the full movie list
  useEffect(() => {
    const filtered = allMovies.filter(movie =>
      favorites.includes(movie.moviename)
    );
    setFavoriteMovies(filtered);
  }, [allMovies, favorites]);

  // If no favorites
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h2> Your Favorite Movies</h2>
        <p className="no-favs">No favorites added yet.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
       <Link to={'/'}><HomeIcon/></Link> 
      <h2> Your Favorite Movies</h2>
      <div className="favorites-grid">
        {favoriteMovies.map((movie, index) => (
          <div className="favorites-card" key={index}>
            <img
              src={movie.poster_url}
              alt={movie.moviename}
              className="poster"
            />
            <h3>{movie.moviename}</h3>
            <p>⭐ {movie.rating} | 👍 {movie.recommendation}%</p>
            <p>📅 {movie.released_year} | 🎬 {movie.language}</p>
            <p>📺 {movie.platform}</p>
            <FavoriteIcon className="fav-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
