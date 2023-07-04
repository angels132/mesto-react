import React from "react";
import logo from "../images/Logo-white.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
    </header>
  );
}

export default Header;
