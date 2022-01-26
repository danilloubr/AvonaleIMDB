import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import MovieFeatured from "../../components/MovieFeatured";
import { popularMovies } from "../../services/services";
import "./Home.css";

function Home() {
  const [movie, setMovie] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

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

    fetchLoad();
  }, []);
  return (
    <div className="page-total">
      {featuredData && <MovieFeatured featuredData={featuredData} />}
      <h2>Filmes mais populares</h2>
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
