import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import MovieFeatured from "../../components/MovieFeatured";
import { popularMovies } from "../../services/services";

import Loading from "../../midia/LoadTime.gif";
import "./Home.css";
import Nav from "../../components/Nav";

function Home() {
  const [movie, setMovie] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  return (
    <div className="page-total">
      <Nav blackHeader={blackHeader} />
      {featuredData && (
        <div className="featuredHome">
          <MovieFeatured featuredData={featuredData} />
          <h2>Filmes mais populares</h2>
        </div>
      )}
      <section className="lists">
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
