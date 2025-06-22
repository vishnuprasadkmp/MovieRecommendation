import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Favorites from "./components/Favorites";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieName) => {
    setFavorites(prev =>
      prev.includes(movieName)
        ? prev.filter(name => name !== movieName)
        : [...prev, movieName]
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
