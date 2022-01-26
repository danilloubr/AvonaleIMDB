import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import { popularMovies } from "../../services/services";
import "./Home.css";

function Home() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchLoad = async () => {
      const { data: resp } = await popularMovies();
      const { results } = resp;
      console.log(results);
      setMovie(results);
    };

    fetchLoad();
  }, []);
  return (
    <div className="page-total">
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
