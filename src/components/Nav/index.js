import React from "react";
import Logo from "../../midia/logo.png";
import LogoProfile from "../../midia/logoprofile.png";
import Lupa from "../../midia/lupa.png";
import Favorito from "../../midia/favorito.png";
import "./Nav.css";

function Nav({ blackHeader, search, setSearch }) {
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  return (
    <header className={blackHeader ? "blackHeader" : ""}>
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="LogoAvonale" />
        </a>
      </div>
      <div className="input-search-nav">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <img className="lupa" src={Lupa} alt="LogoAvonale" />
      </div>
      <a href="/favorite">
        <button className="btn-nav">
          Favoritos
          <div className="logo-profile">
            {favorite.length > 0 && (
              <img
                className="favorito"
                src={Favorito}
                alt={""}
                title="Clique para ver a lista de filmes"
              />
            )}

            <img src={LogoProfile} alt="LogoProfile" />
          </div>
        </button>
      </a>
    </header>
  );
}

export default Nav;
