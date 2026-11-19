import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../assets/akslogo.png";
import "./navbar.css";

const navigation = [
  { label: "Início", to: "/", end: true },
  { label: "Serviços", to: "/services" },
  { label: "Sobre nós", to: "/about" },
  { label: "Contato", to: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className={`aks-header${isScrolled ? " aks-header--scrolled" : ""}${menuOpen ? " aks-header--open" : ""}`}
    >
      <div className="aks-header__hairline" aria-hidden="true" />
      <nav className="aks-header__inner" aria-label="Navegação principal">
        <Link
          className="aks-header__brand"
          to="/"
          aria-label="AKS Tur — página inicial"
        >
          <img src={logo} alt="AKS Tur" className="aks-header__logo" />
        </Link>

        <div className="aks-header__desktop">
          <ul className="aks-header__links">
            {navigation.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink
                  end={end}
                  to={to}
                  className={({ isActive }) =>
                    `aks-header__link${isActive ? " aks-header__link--active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="aks-header__separator" aria-hidden="true" />
          <Link className="aks-header__cta" to="/contact">
            Planeje sua viagem
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <button
          ref={toggleRef}
          className="aks-header__toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="aks-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="aks-header__toggle-line" />
          <span className="aks-header__toggle-line" />
        </button>
      </nav>

      <div
        id="aks-mobile-nav"
        className="aks-header__mobile"
        hidden={!menuOpen}
      >
        <div className="aks-header__mobile-inner">
          <p className="aks-header__mobile-label">Explore a AKS Tur</p>
          <ul>
            {navigation.map(({ label, to, end }, index) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `aks-header__mobile-link${isActive ? " aks-header__mobile-link--active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="aks-header__mobile-index">0{index + 1}</span>
                  <span>{label}</span>
                  <span className="aks-header__mobile-arrow" aria-hidden="true">
                    ↗
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="aks-header__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Planeje sua viagem <span aria-hidden="true">→</span>
          </Link>
          <p className="aks-header__mobile-footer">
            Sua próxima experiência começa aqui.
          </p>
        </div>
      </div>
    </header>
  );
}
