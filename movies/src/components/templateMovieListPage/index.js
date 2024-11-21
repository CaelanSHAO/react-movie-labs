import React, { useEffect, useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { QueryClientProvider, QueryClient } from "react-query";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";
import { getMovies } from "../../api/tmdb-api";
import { get } from "react-hook-form";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000, 
        refetchOnWindowFocus: false
      },
    },
  });

  function MovieListPageTemplate({title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);


  const [ratingFilter, setRatingFilter] = useState("");
  const [sortKey, setSortKey] = useState("title");


  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 20;

  useEffect(()=>{
    const fetchMovies=async()=>{
      try {
        const data = await getMovies(page);
        setMovies(data.results || []);
       } catch (error) {
        console.error("Failed to fetch movies:", error);
       }fetchMovies();
     };
  },[page]);
    
    const handlePageChange = (event, value) => {
      setPage(value);
    };

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })


    .filter((m) => {
      if(!ratingFilter)return true;
      const [min, max] = ratingFilter.split("-").map(Number);
      return m.vote_average >= min && m.vote_average <= max;
    })


    .sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      if (sortKey === "rating") return b.vote_average - a.vote_average;
      if (sortKey === "release_date") return new Date(b.release_date) - new Date(a.release_date);
      return 0;
    });

  const handleSortChange = (value) => setSortKey(value);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
  };

  /* return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            onSortChange={handleSortChange}
          />
        </Grid>
         <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
 */
  
  return(
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Header title={title} />
      <Grid container spacing={3}>

      <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
          <Box
            sx={{
              padding: "16px",
              backgroundColor: "#dce775",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
              ratingFilter={ratingFilter}
              onSortChange={handleSortChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "flex-start",
            }}
          >
            <MovieList action={action} movies={displayedMovies} />
          </Box>
        </Grid>

      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination 
           count={totalPages}
           page={page}
           onChange={handlePageChange}
           color="primary"
          />
      </Box>
    </Box>
  
  );
}
export default MovieListPageTemplate;