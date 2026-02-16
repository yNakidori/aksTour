import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/akslogo.png";
import "./navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen((s) => !s);
  };

  // Close dropdown on outside click or Esc
  useEffect(() => {
    function onDocClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
    }

    function onKey(e) {
      if (e.key === "Escape" && isDropdownOpen) setIsDropdownOpen(false);
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  // Helper: determine if device is mobile (for hover behavior)
  const isMobileDevice = () =>
    window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

  return (
    <nav
      style={{ backgroundColor: "rgba(16,42,67,0.85)" }}
      className={`navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg rounded-b-2xl transition-all duration-300 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
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
            ref={dropdownRef}
            onMouseEnter={() => !isMobileDevice() && setIsDropdownOpen(true)}
            onMouseLeave={() => !isMobileDevice() && setIsDropdownOpen(false)}
          >
            <button
              ref={dropdownButtonRef}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              className="dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownClick();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleDropdownClick();
                }
              }}
            >
              Destinos ▾
            </button>

            <ul className="dropdown-menu" role="menu" aria-label="Destinos">
              <li role="none">
                <Link
                  role="menuitem"
                  to="/destinys/nacionais"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Nacionais
                </Link>
              </li>
              <li role="none">
                <Link
                  role="menuitem"
                  to="/destinys/internacionais"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Internacionais
                </Link>
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
