import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/aksLogo.jpg";

const Navbar = () => {
  return (
    <nav className="p-4" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" width="55" className="rounded-full" />
        </div>
        <ul className="flex space-x-4">
          <li className="text-orange-400 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/destinys">Destinos</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/events">Eventos</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/cruzers">Cruzeiros</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/caravans">Caravanas</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/services">Serviços</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/contact">Contato</Link>
          </li>
          <span>|</span>
          <li className="text-orange-400 hover:underline">
            <Link to="/social">Social</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
