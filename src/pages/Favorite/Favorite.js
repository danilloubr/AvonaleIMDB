import React, { Fragment } from "react";
import Nav from "../../components/Nav";
import "./Favorite.css";

function Favorite() {
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  console.log("FAVORITO NAV", favorite);

  return (
    <Fragment>
      <Nav className="header-favorite" />
      <section className="animeLeft">
        <div className="page-total-favorite">
          <div className="movie-item-favorite">
            {favorite.map((item) => (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                  key={item.id}
                />
              </>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Favorite;
