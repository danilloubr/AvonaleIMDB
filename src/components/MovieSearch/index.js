import React, { Fragment, useState } from "react";
import { searchItem } from "../../services/services";
import "./MovieSearch.css";
import Background from "../../midia/background-search.jpg";

function MovieSearch({ openModal, search }) {
  const [movie, setMovie] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);

  const searchMovie = async (e) => {
    e.preventDefault();
    const item = await searchItem(movie);
    const { results } = item.data;

    setMovieSearch(results);

    let element = document.getElementById("animeLeft");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      <section className="page-total-movieSearch">
        <div
          className="search-background"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${Background})`,
          }}
        >
          <h1>Não achou seu filme?</h1>
          <h2>Nós podemos achar ele para você :)</h2>
          <form onSubmit={searchMovie}>
            <input
              type="text"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
          </form>
        </div>
        {movieSearch.length > 0 && (
          <section className="animeLeft" id="animeLeft" name="animeLeft">
            <div className="page-total-search">
              <div className="movie-item-search">
                {movieSearch &&
                  movieSearch
                    .filter((item) =>
                      item.title.toLowerCase().includes(search?.toLowerCase())
                    )
                    .map((item, key) => (
                      <div className="movie-hover" key={key}>
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
