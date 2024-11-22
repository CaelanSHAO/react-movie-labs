import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import AddToWatchlistIcon from "../cardIcons/addToWatchlist";

export default function MovieCard({movie, action}) {

  const { favorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  return (
    <Card
     sx={{
      maxWidth:"345px",
      width: "100%",
      margin: "auto",
      padding: "20px",
      boxShadow: 3,
      borderRadius: 2,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
          transform: "scale(1.05)", //悬停时侯放大
      },
     }}
    >
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" noWrap>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography variant="subtitle1" component="p">
              <CalendarIcon fontSize="small"  sx={{ marginRight: "5px" }}/>
              {movie.release_date || "N/A"}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="subtitle1" component="p">
              <StarRateIcon fontSize="small" sx={{ marginRight: "5px" }}/>
              {"  "} {movie.vote_average || "N/A" }{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>


      <CardActions disableSpacing>
        {action(movie)}
        <AddToWatchlistIcon movie={movie} />
        <Link to={`/movies/${movie.id}`} >
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}