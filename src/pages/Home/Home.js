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
  const [scrollX, setScrollX] = useState(-250);

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
    console.log("LENGHT", movie.length);
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movie.length * 170;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 140;
    }
    setScrollX(x);
  };

  return (
    <div className="page-total">
      <Nav blackHeader={blackHeader} />
      {featuredData && (
        <div className="featuredHome">
          <MovieFeatured featuredData={featuredData} />
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
        style={{ marginLeft: scrollX, transition: "all ease 0.5s" }}
      >
        {movie.map((item, key) => (
          <MovieList key={key} item={item} />
        ))}
      </section>
      <h2>Meus Filmes Favoritos</h2>
      <section className="lists">
        {movie.map((item, key) => (
          <MovieList key={key} item={item} />
        ))}
      </section>
    </div>
  );
}

export default Home;
