import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/aksLogo.jpg";
import "./navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // NOVO

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" />

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li
            className={`dropdown ${isDropdownOpen ? "open" : ""}`}
            onClick={handleDropdownClick}
          >
            <span>Destinos ▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/destinys/nacionais">Nacionais</Link>
              </li>
              <li>
                <Link to="/destinys/internacionais">Internacionais</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/events">Eventos</Link>
          </li>
          <li>
            <Link to="/cruise">Cruzeiros</Link>
          </li>
          <li>
            <Link to="/bus">Rodoviário</Link>
          </li>
          <li>
            <Link to="/services">Serviços</Link>
          </li>
          <li>
            <Link to="/contact">Contato</Link>
          </li>
          <li>
            <Link to="/social">Social</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
