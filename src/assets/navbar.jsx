import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/images/aksLogo.jpg";

const Navbar = () => {
  return (
    <nav className="top-0 left-0 w-full bg-slate-300 bg-opacity-80 shadow-lg flex items-center space-x-6 backdrop-blur-md z-50 text-lg px-4 py-2">
      <div>
        <img src={logo} alt="logo" width="55" className="rounded-full" />
      </div>
      <ul className="flex  justify-items-center space-x-4">
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/">Home</Link>
        </li>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 flex items-center font-poppins">
            Destinos <ChevronDownIcon className="w-5 h-5 ml-2" />
          </MenuButton>
          <MenuItems className="absolute mt-2 w-40 bg-sky-100 shadow-lg rounded-md py-1">
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys"
                  className={`font-poppins block px-4 py-2 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Explore
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys/nacionais"
                  className={`font-poppins block px-4 py-2 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Nacionais
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/destinys/internacionais"
                  className={`font-poppins block px-4 py-2 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Internacionais
                </Link>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/events">Eventos</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/cruise">Cruzeiros</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/bus">Ônibus</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/services">Serviços</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 border-r pr-4 border-gray-900 font-poppins">
          <Link to="/contact">Contato</Link>
        </li>
        <li className="text-sky-600 hover:text-sky-700 font-poppins">
          <Link to="/social">Social</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
