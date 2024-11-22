import React, { useEffect, useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
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

  
  /*   const fetchMovies=async(page)=>{
      try {
        const data = await getMovies(page);
        setMovies(data.results || []);
       } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]);
        setPage(1);
       }
     };
  
     useEffect(() => {
      fetchMovies(page);
    }, [page]);
 */
    const { data, error, isLoading, isError } = useQuery(
      ["movies", { page, genreFilter, ratingFilter }],
      () => getMovies({ page, genreFilter, ratingFilter }),
      {
        keepPreviousData: true,
        onSuccess: (data) => {
          if (!data.results || data.results.length === 0) {
            console.warn("No results found.");
          }
        },
        onError: (err) => {
          console.error("Failed to fetch movies:", err);
        },
      }
    );


    const handlePageChange = (event, value) => {
      if (value < 1 || value > totalPages) {
        console.error("Page out of bounds:", value);
        setPage(1);
        return;
    }
     console.log("Changing to page:", value);
      setPage(value);
    };

  let displayedMovies = (data?.results || [])
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

  const handleSortChange = (event) => {setSortKey(event.target.value)};

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
  };
   
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
      {totalPages > 1 &&(<Pagination 
           count={totalPages}
           page={page}
           onChange={handlePageChange}
           color="primary"
          />) }
      </Box>
    </Box>
  
  );
}
export default MovieListPageTemplate;