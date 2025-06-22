import { useState } from "react";
import Search from "./Search";
import Trending from "./Trending";
import Language from "./Language";

function LandingPage({ favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Search
        onSearch={handleSearch}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Trending favorites={favorites} toggleFavorite={toggleFavorite} />
      <Language favorites={favorites} toggleFavorite={toggleFavorite} />
    </>
  );
}

export default LandingPage;
