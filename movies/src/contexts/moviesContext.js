import React, { useState, createContext, useContext } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); 
  const [watchlist, setWatchlist] = useState([]);

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie.id]);
  };

  
  const addToMustWatch = (movieId) => {
    if (!mustWatch.includes(movieId)) {
      setMustWatch([...mustWatch, movieId]);
    }
  };
  
  const addToWatchlist = (movieId) => {
    if (!watchlist.includes(movieId)) {
      setWatchlist([...watchlist, movieId]);
    }
  };



  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        mustWatch,          
        addToMustWatch,    
        watchlist,
        addToWatchlist,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
