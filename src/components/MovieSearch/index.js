import React, { Fragment, useState } from "react";
import { searchItem } from "../../services/services";
import "./MovieSearch.css";

function MovieSearch({ openModal }) {
  const [movie, setMovie] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);

  const searchMovie = async (e) => {
    e.preventDefault();
    const item = await searchItem(movie);
    const { results } = item.data;
    console.log("ITEM DIGITADO", movie);
    console.log("ITEM PESQUISADO", results);

    setMovieSearch(results);
  };

  return (
    <Fragment>
      <section className="page-total-movieSearch">
        <div
          className="search-background"
          style={{
            opacity: "0.8",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage:
              "url(https://cdn.falauniversidades.com.br/wp-content/uploads/2018/03/fala-universidades-netflix-3.jpg)",
          }}
        >
          <form onSubmit={searchMovie}>
            <input
              type="text"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
          </form>
        </div>
        {movieSearch.length > 0 && (
          <section className="animeLeft">
            <div className="page-total-search">
              <div className="movie-item-search">
                {movieSearch.map((item, key) => (
                  <div className="teste" key={key}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      alt={item.original_title}
                      onClick={() => openModal(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </Fragment>
  );
}

export default MovieSearch;
