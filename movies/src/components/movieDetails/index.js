import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { Link } from "react-router-dom";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>




      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      
      
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      
      <Paper component="ul" sx={{ ...root }}>
        <Chip label="Production Countries" color="primary" sx={{ ...chip }} />
        {movie.production_countries && movie.production_countries.length > 0 ? (
          movie.production_countries.map((country) => (
            <Chip key={country.name} label={country.name} sx={{ ...chip }} />
          ))
        ) : (
          <Chip label="No production country data available" sx={{ ...chip }} />
        )}
      </Paper>


      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", padding: 1.5 }}>
        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 ? (
          movie.credits.cast.map((actor) => (
            <li key={actor.id}>
              <Chip
                label={actor.name}
                component={Link}
                to={`/person/${actor.id}`} 
                clickable
                sx={{ margin: 0.5 }}
              />
            </li>
          ))
        ) : (
          <Chip label="No cast data available" sx={{ margin: 0.5 }} />
        )}
      </Paper>


      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>



      </>
  );
};
export default MovieDetails ;