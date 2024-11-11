import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../contexts/moviesContext"; // 导入 MoviesContext

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
  const { addToMustWatch } = useContext(MoviesContext); // 使用 addToMustWatch 函数

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <PlaylistAddIcon
            color="primary"
            sx={{ fontSize: 30, cursor: "pointer" }}
            onClick={() => addToMustWatch(movie.id)} // 绑定点击事件
          />
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
