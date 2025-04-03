import React from "react";
import "./MovieList.css";

function MovieList({ movie }) {
  return (
    <div className="movies__list">
      <form className="movies__form">
        <div className="movie__card">
          <div>
            <h1 className="movie__name">MOvie: {movie.name}</h1>
            <h2 className="movie__year">
              Year of Release: {movie.year_of_release}
            </h2>
            <h3 className="movie__producer">
              Producer: {movie.producer?.name}
            </h3>
            <div className="movie__actors">
              Actor:{" "}
              {movie.actors?.map((item, id) =>
                id === movie.actors.length - 1
                  ? `${item.name}`
                  : `${item.name}, `
              )}
            </div>
            <button className="edit__movies">Edit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MovieList;
