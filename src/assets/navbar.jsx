import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-blue-600 text-2xl font-poppins">AKS</h1>
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
