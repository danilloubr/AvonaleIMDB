import React from "react";
import Logo from "../../midia/logo.png";
import LogoProfile from "../../midia/logoprofile.png";
import Lupa from "../../midia/lupa.png";
import Favorito from "../../midia/favorito.png";
import "./Nav.css";

function Nav({ blackHeader }) {
  const json = localStorage.getItem("FAVORITOS");
  const favorite = JSON.parse(json);

  console.log("FAVORITO NAV", favorite);
  return (
    <header className={blackHeader ? "blackHeader" : ""}>
      <div className="logo">
        <img src={Logo} alt="LogoAvonale" />
      </div>
      <div className="input-search">
        <input></input>
        <img className="lupa" src={Lupa} alt="LogoAvonale" />
      </div>

      <div className="logo-profile">
        {favorite && (
          <img
            className="favorito"
            src={Favorito}
            alt={""}
            title="Clique para ver a lista de filmes"
          />
        )}

        <img src={LogoProfile} alt="LogoProfile" />
      </div>
    </header>
  );
}

export default Nav;
