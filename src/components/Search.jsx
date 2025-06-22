import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../styles/Search.css";
import { Link } from "react-router-dom";

const Search = ({ onSearch, onToggleFavorites, showFavorites, favorites }) => {
  const [query, setQuery] = useState("");
  const [flashFavorite, setFlashFavorite] = useState(false);
  const [prevFavoritesCount, setPrevFavoritesCount] = useState(favorites.length);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  // Detect when favorites count changes
  useEffect(() => {
    if (favorites.length !== prevFavoritesCount) {
      setFlashFavorite(true);
      setPrevFavoritesCount(favorites.length);

      const timeout = setTimeout(() => {
        setFlashFavorite(false);
      }, 2000); // 2 seconds

      return () => clearTimeout(timeout);
    }
  }, [favorites, prevFavoritesCount]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
      <Link to="/favorites" className={`favorites-btn ${flashFavorite ? "flash" : ""}`}>
  {favorites.length > 0 ? (
    <FavoriteIcon className={flashFavorite ? "animated-heart" : ""} />
  ) : (
    <FavoriteBorderIcon />
  )}
</Link>
    </div>
  );
};

export default Search;
