import React, { Fragment, useState } from "react";
import Modal from "react-responsive-modal";
import { useHistory } from "react-router-dom";
import MovieFeatured from "../../components/MovieFeatured";
import Nav from "../../components/Nav";
import "./Favorite.css";

function Favorite() {
  const [open, setOpen] = useState(false);
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  const history = useHistory();

  const openModal = (item) => {
    setOpen(item);
  };
  const handleClose = () => {
    setOpen(false);
    history.push("/favorite");
  };

  return (
    <Fragment>
      {favorite.length === 0 && (
        <div className="sem-filmes">
          <h1>Sua lista de filmes está vazia.</h1>
        </div>
      )}
      <Nav className="header-favorite" />
      <section className="animeLeft">
        <div className="page-total-favorite">
          <div className="movie-item-favorite">
            {favorite.map((item, key) => (
              <div div key={key}>
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
      <Modal
        open={open}
        onClose={handleClose}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <MovieFeatured featuredData={open} />
      </Modal>
    </Fragment>
  );
}

export default Favorite;
