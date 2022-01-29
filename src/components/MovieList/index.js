import React from "react";
import "./MovieList.css";

function MovieList({ item, openModal }) {
  if (!item) return null;

  function openMovie(item) {
    openModal(item);
  }

  return (
    <div className="movie-row">
      <div className="movie-list-area">
        <div className="movie-list">
          <div className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.original_title}
              onClick={() => openMovie(item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
