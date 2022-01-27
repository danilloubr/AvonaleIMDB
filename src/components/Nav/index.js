import React from "react";
import Logo from "../../midia/logo.png";
import LogoProfile from "../../midia/logoprofile.png";
import Lupa from "../../midia/lupa.png";
import "./Nav.css";

function Nav({ blackHeader }) {
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
        <img src={LogoProfile} alt="LogoProfile" />
      </div>
    </header>
  );
}

export default Nav;
