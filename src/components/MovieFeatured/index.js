import React from "react";
import "./MovieFeatured.css";

function MovieFeatured({ featuredData }) {
  console.log("featuredDataAQUI", featuredData);
  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
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
            <button className="btn-watch">Assistir</button>
            <button className="btn-favorites">Favoritos</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieFeatured;
