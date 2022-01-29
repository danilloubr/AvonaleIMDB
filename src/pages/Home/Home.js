import React, { useEffect, useState, Fragment } from "react";

import MovieList from "../../components/MovieList";
import MovieFeatured from "../../components/MovieFeatured";

import { popularMovies } from "../../services/services";
import SetaD from "../../midia/seta-direita.png";
import SetaE from "../../midia/seta-esquerda.png";

import Loading from "../../midia/LoadTime.gif";
import "./Home.css";
import Nav from "../../components/Nav";
import Modal from "react-responsive-modal";
import MovieSearch from "../../components/MovieSearch";
import { toast } from "react-toastify";

function Home() {
  const [movie, setMovie] = useState([]);
  const [movieModal, setMovieModal] = useState(null);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const [scrollXB, setScrollXB] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLoad = async () => {
      const { data: resp } = await popularMovies();
      const { results } = resp;

      setMovie(results);

      const randomChosen = Math.floor(Math.random() * (results.length - 1));
      const chosen = results[randomChosen];

      setFeaturedData(chosen);
    };
    setTimeout(fetchLoad, 1000);
    setInterval(fetchLoad, 10000);
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 40) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.addEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("FAVORITOS") === null)
      localStorage.setItem("FAVORITOS", "[]");
  }, []);

  if (!featuredData) {
    return (
      <div className="home-loading">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movie.length * 170;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 140;
    }
    setScrollX(x);
  };
  const handleLeftArrowB = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }

    setScrollXB(x);
  };

  const handleRightArrowB = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = listFavorites.length * 170;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 140;
    }
    setScrollXB(x);
  };

  const addFavorite = (filme) => {
    const movieExist = favorite.find((item) => item.id === filme.id);
    const movieExistFavorite = dataJson.find((item) => item.id === filme.id);

    if (!movieExist && !movieExistFavorite) {
      setFavorite([...dataJson, filme]);
      localStorage.setItem("FAVORITOS", JSON.stringify([...dataJson, filme]));

      toast("Filme adicionado com sucesso!");
    } else {
      setFavorite([...dataJson]);
      localStorage.setItem("FAVORITOS", JSON.stringify([...dataJson]));
      toast("Você já tem esse filme nos favoritos!");
    }
  };

  const openModal = (filme) => {
    setMovieModal(filme);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const data = localStorage.getItem("FAVORITOS");
  const dataJson = JSON.parse(data);

  const listFavorites = [...dataJson];

  return (
    <Fragment>
      <div className="page-total">
        <Nav blackHeader={blackHeader} search={search} setSearch={setSearch} />
        {featuredData && (
          <div className="featuredHome">
            <MovieFeatured
              featuredData={featuredData}
              addFavorite={addFavorite}
            />
            <h2>Filmes mais populares</h2>
          </div>
        )}
        <div className="movie-left" onClick={handleLeftArrow}>
          <img src={SetaE} alt="SetaE" style={{ maxWidth: "40px" }} />
        </div>
        <div className="movie-right" onClick={handleRightArrow}>
          <img src={SetaD} alt="SetaD" style={{ maxWidth: "40px" }} />
        </div>
        <section
          className="lists"
          style={{ marginLeft: scrollX, transition: "all ease 1s" }}
        >
          {movie &&
            movie
              .filter((item) =>
                item.title.toLowerCase().includes(search?.toLowerCase())
              )
              .map((item, key) => (
                <MovieList
                  key={key}
                  item={item}
                  addFavorite={addFavorite}
                  openModal={openModal}
                />
              ))}
        </section>

        {listFavorites.length > 0 && (
          <div>
            <h2>Meus Filmes Favoritos</h2>
            {listFavorites.length > 7 && (
              <div>
                <div className="movie-left" onClick={handleLeftArrowB}>
                  <img src={SetaE} alt="SetaE" style={{ maxWidth: "40px" }} />
                </div>
                <div className="movie-right" onClick={handleRightArrowB}>
                  <img src={SetaD} alt="SetaD" style={{ maxWidth: "40px" }} />
                </div>
              </div>
            )}
            <section
              className="lists"
              style={{ marginLeft: scrollXB, transition: "all ease 1s" }}
            >
              {listFavorites &&
                listFavorites.map((item, key) => (
                  <MovieList
                    key={key}
                    item={item}
                    addFavorite={addFavorite}
                    openModal={openModal}
                  />
                ))}
            </section>
            <MovieSearch openModal={openModal} search={search} />
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={closeModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <MovieFeatured
          featuredData={movieModal}
          addFavorite={addFavorite}
          closeModal={closeModal}
        />
      </Modal>
    </Fragment>
  );
}

export default Home;
