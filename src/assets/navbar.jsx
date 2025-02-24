import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/images/aksLogo.jpg";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-100 bg-opacity-80 shadow-lg rounded-full px-8 py-4 flex items-center space-x-6 backdrop-blur-md z-50 text-lg">
      <div>
        <img src={logo} alt="logo" width="55" className="rounded-full" />
      </div>
      <ul className="flex space-x-4">
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/">Home</Link>
        </li>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 flex items-center">
            Destinos <ChevronDownIcon className="w-5 h-5 ml-2" />
          </MenuButton>
          <MenuItems className="absolute mt-2 w-40 bg-orange-100 shadow-lg rounded-md py-1 transition-transform transform scale-95 opacity-0 origin-top-left focus:scale-100 focus:opacity-100">
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys"
                  className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                >
                  Explore
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys/nacionais"
                  className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                >
                  Nacionais
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys/internacionais"
                  className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                >
                  Internacionais
                </Link>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/events">Eventos</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/cruzers">Cruzeiros</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/caravans">Caravanas</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/services">Serviços</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900">
          <Link to="/contact">Contato</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700">
          <Link to="/social">Social</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
