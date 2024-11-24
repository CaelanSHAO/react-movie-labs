import React, { useState } from "react";
import { set } from "react-hook-form";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} );
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 20;

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
      console.log(newFavorites)
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const handlePageChange = (event, value) => {
    if (value < 1 || value > totalPages) {
      console.error("Page out of bounds:", value);
      setPage(1);
      return;
  }
   console.log("Changing to page:", value);
    setPage(value);
  };

  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
  
  const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)){
      newWatchlist = [...watchlist, movie.id];
    }
    else{
      newWatchlist = [...watchlist];
    }
    setWatchlist(newWatchlist)
  };
  
  const removeFromWatchlist = (movie) => {
    setWatchlist( watchlist.filter(
      (mId) => mId !== movie.id
    ) )
  };



  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        addReview,
        page,
        handlePageChange,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;