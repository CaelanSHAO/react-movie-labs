import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import FilterMoviesCard from "../components/filterMoviesCard";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);


  
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["favoriteMovie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

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



  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;