import React from "react";
import { toast } from "react-toastify";

import "./MovieFeatured.css";

function MovieFeatured({ featuredData, addFavorite, closeModal }) {
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  const existItem = favorite.find((item) => item.id === featuredData.id);

  function removeItem(item) {
    const newList = favorite.filter((movie) => movie.id !== item.id);
    localStorage.setItem("FAVORITOS", JSON.stringify(newList));
    closeModal();
    toast("Filme removido com Sucesso!");
  }

  return (
    <div className="animeLeft">
      <section
        className="featured"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
        }}
      >
        <div className="featured-vertical">
          <div className="featured-horizontal">
            <div className="featured-title">{featuredData.title}</div>
            <div className="featured-info">
              <div className="featured-info-points">
                {featuredData.vote_average} pontos
              </div>
              <div className="featured-info-year">
                {featuredData && featuredData.release_date.slice(0, 4)}
              </div>
            </div>
            <div className="featured-overview">{featuredData.overview}</div>
            <div className="featured-button">
              <button className="btn-watch">Assistir Trailer</button>

              <button
                className={existItem ? "btn-remove" : "btn-favorites"}
                onClick={
                  existItem
                    ? () => removeItem(featuredData)
                    : () => addFavorite(featuredData)
                }
              >
                {existItem
                  ? "Remover dos Favoritos"
                  : "Adicionar aos Favoritos"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieFeatured;
