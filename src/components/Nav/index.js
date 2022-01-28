import React from "react";
import Logo from "../../midia/logo.png";
import LogoProfile from "../../midia/logoprofile.png";
import Lupa from "../../midia/lupa.png";
import Favorito from "../../midia/favorito.png";
import "./Nav.css";

function Nav({ blackHeader, search, setSearch }) {
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  console.log("FAVORITO NAV", favorite);
  return (
    <header className={blackHeader ? "blackHeader" : ""}>
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="LogoAvonale" />
        </a>
      </div>
      <div className="input-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <img className="lupa" src={Lupa} alt="LogoAvonale" />
      </div>

      <div className="logo-profile">
        {favorite.length > 0 && (
          <img
            className="favorito"
            src={Favorito}
            alt={""}
            title="Clique para ver a lista de filmes"
          />
        )}
        <a href="/favorite">
          <img src={LogoProfile} alt="LogoProfile" />
        </a>
      </div>
    </header>
  );
}

export default Nav;
