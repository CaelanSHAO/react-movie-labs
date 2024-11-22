import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange=(e)=>{
    handleChange(e, "sort", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: "100%",
        padding: "16px",
        margin: "auto",
        boxShadow: 3,
        borderRadius: "8px",
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
                <TextField
            sx={{...formControl}}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
            />
        <FormControl sx={{...formControl, marginTop: 2}}>
          <InputLabel id="genre-label">Genre</InputLabel>
            <Select
                labelId="genre-label"
                id="genre-select"
                defaultValue="0"
                value={props.genreFilter}
                onChange={handleGenreChange}
    >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


        <FormControl sx={{...formControl, marginTop: 2}}>
          <InputLabel id="rating-label">Rating Range</InputLabel>
            <Select
                labelId="rating-label"
                id="rating-select"
                defaultValue=""
                onChange={(e) => handleChange(e, "rating", e.target.value)}
            >
           <MenuItem value="0-5">0-5</MenuItem>
           <MenuItem value="5-7">5-7</MenuItem>
           <MenuItem value="7-10">7-10</MenuItem>
          </Select>
        </FormControl>



        <FormControl sx={{...formControl, marginTop: 2}}>
        <InputLabel id="sort-label">sort by</InputLabel>
            <Select
                labelId="sort-label"
                id="sort-select"
                defaultValue=""
                value={props.genreFilter}
                onChange={props.onSortChange}
            >
               <MenuItem value="title">Title</MenuItem>
               <MenuItem value="rating">Rating</MenuItem>
               <MenuItem value="release_date">Release Date</MenuItem>
              
            
          </Select>
        </FormControl>

      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
