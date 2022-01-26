import React from "react";
import "./MovieList.css";

function MovieList({ item }) {
  console.log("item", item);

  if (!item) return null;

  console.log("itemL", item);
  return (
    <div className="movie-row">
      <div className="movie-list-area">
        <div className="movie-list">
          <div className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.original_title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
