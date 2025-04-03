import React, { useEffect, useState } from "react";
import "./FetchMovies.css";

const FetchMovies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_API}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log(data);
    } catch (err) {
      console.log("Error fetching movies", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="home__conatiner">
      {movies.length > 0 && (
        <div>
          <h1>Trending Movies</h1>
          <div className="movies__container">
            {movies.map((movie) => {
              return (
                <div key={movie.id}>
                  <h1>{movie.original_title}</h1>
                  <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE}${
                      movie.backdrop_path
                    }`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchMovies;
