import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import MovieFeatured from "../../components/MovieFeatured";
import { popularMovies } from "../../services/services";
import SetaD from "../../midia/seta-direita.png";
import SetaE from "../../midia/seta-esquerda.png";

import Loading from "../../midia/LoadTime.gif";
import "./Home.css";
import Nav from "../../components/Nav";

function Home() {
  const [movie, setMovie] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [scrollX, setScrollX] = useState(-250);
  const [scrollXB, setScrollXB] = useState(0);

  useEffect(() => {
    const fetchLoad = async () => {
      const { data: resp } = await popularMovies();
      const { results } = resp;
      console.log(results);
      setMovie(results);

      const randomChosen = Math.floor(Math.random() * (results.length - 1));
      const chosen = results[randomChosen];
      // console.log("randomChosen", randomChosen);
      console.log("CHOSEN", chosen);
      // console.log("results", results);
      // console.log("resp", resp);

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

  console.log("FEATUREDDATA", featuredData);

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
    console.log("FILMEDENTRO", filme);
    console.log("MOVIEAQUI", movie);
    console.log("FAVORITOSDENTRO", favorite);
    const movieExist = favorite.find((item) => item.id === filme.id);
    console.log("MOVIEEXISTE", movieExist);
    if (!movieExist) {
      setFavorite([...favorite, filme]);
      localStorage.setItem("FAVORITOS", JSON.stringify([...dataJson, filme]));

      alert("Filme adicionado com sucesso!");
    } else {
      setFavorite([...favorite]);
      localStorage.setItem("FAVORITOS", JSON.stringify([...dataJson]));
      alert("Filme já existe!");
    }
  };

  const data = localStorage.getItem("FAVORITOS");
  const dataJson = JSON.parse(data);
  console.log("DATA JSON", dataJson);

  const listFavorites = [...dataJson];
  console.log("LIST FAVORITAAA", listFavorites);

  return (
    <div className="page-total">
      <Nav blackHeader={blackHeader} />
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
        {movie.map((item, key) => (
          <MovieList key={key} item={item} addFavorite={addFavorite} />
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
                <MovieList key={key} item={item} />
              ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default Home;
