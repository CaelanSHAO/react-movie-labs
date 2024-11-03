import React, { useState, createContext, useContext } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); // 新增的状态变量

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie.id]);
  };

  // 添加电影到 mustWatch 列表的函数
  const addToMustWatch = (movieId) => {
    if (!mustWatch.includes(movieId)) {
      setMustWatch([...mustWatch, movieId]);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        mustWatch,          // 提供 mustWatch 状态
        addToMustWatch,     // 提供添加函数
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
