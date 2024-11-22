import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";
import FilterMoviesCard from "../components/filterMoviesCard";

const WatchlistMoviesPage = () => {
  const {watchlist: movieIds } = useContext(MoviesContext);

  
  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  
  const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

if(movieIds.length===0){
  return(
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <FilterMoviesCard/>
    
    </div>
  );
}



  const movies = watchlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watchlist Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlistIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistMoviesPage;