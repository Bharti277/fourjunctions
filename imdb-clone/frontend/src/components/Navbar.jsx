import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/" className="navbar__brand">
          IMDB Clone
        </a>
      </div>
      <div className="navbar__right">
        <ul className="navbar__links">
          <li className="navbar__item">
            <a href="/signup" className="navbar__link">
              Sign Up
            </a>
          </li>
          <li className="navbar__item">
            <a href="/login" className="navbar__link">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
