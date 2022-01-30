import React, { Fragment, useState } from "react";
import Modal from "react-responsive-modal";

import MovieFeatured from "../../components/MovieFeatured";
import Nav from "../../components/Nav";
import "./Favorite.css";

function Favorite() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  const openModal = (item) => {
    setOpen(item);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {favorite.length === 0 && (
        <div className="sem-filmes">
          <h1>Sua lista de filmes está vazia.</h1>
        </div>
      )}
      <Nav className="header-favorite" search={search} setSearch={setSearch} />
      <section className="animeLeft">
        <div className="page-total-favorite">
          <div className="movie-item-favorite">
            {favorite &&
              favorite
                .filter((item) =>
                  item.title.toLowerCase().includes(search?.toLowerCase())
                )
                .map((item, key) => (
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
        <MovieFeatured featuredData={open} closeModal={handleClose} />
      </Modal>
    </Fragment>
  );
}

export default Favorite;
