import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/aksLogo.jpg";

const Navbar = () => {
  return (
    <nav className="p-4" style={{ backgroundColor: "#102a43" }}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" width="55" className="rounded-full" />
        </div>
        <ul className="flex space-x-4">
          <li className="text-orange-400 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-orange-400 hover:underline">
            <Link to="/destinys">Destinos</Link>
          </li>
          <li className="text-orange-400 hover:underline">
            <Link to="/services">Serviços</Link>
          </li>
          <li className="text-orange-400 hover:underline">
            <Link to="/contact">Contato</Link>
          </li>
          <li className="text-orange-400 hover:underline">Social</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
