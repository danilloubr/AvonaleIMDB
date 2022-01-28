import React from "react";
import "./MovieFeatured.css";

function MovieFeatured({ featuredData, addFavorite }) {
  console.log("FEATURED MOVIE", featuredData);
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
                {featuredData.release_date.slice(0, 4)}
              </div>
            </div>
            <div className="featured-overview">{featuredData.overview}</div>
            <div className="featured-button">
              <button className="btn-watch">Mais Informações</button>
              <button
                className="btn-favorites"
                onClick={() => addFavorite(featuredData)}
              >
                Favoritos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieFeatured;
