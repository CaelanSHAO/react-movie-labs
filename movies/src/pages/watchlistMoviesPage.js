import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";

const watchlistMoviesPage = () => {
  const {Watchlist: movieIds } = useContext(MoviesContext);

  
  const WatchlistMoviesPage = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  
  const isLoading = watchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchMovieQueries.map((q) => {
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
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default watchlistMoviesPage;