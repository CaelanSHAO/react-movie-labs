import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    context.AddToWatchListIcon(movie);
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
      <FavoriteIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;