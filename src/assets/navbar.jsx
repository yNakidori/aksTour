import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import logo from "../assets/images/aksLogo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="top-0 left-0 w-full bg-blue-400 bg-opacity-80 shadow-lg backdrop-blur-md z-50 text-lg px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={logo} alt="logo" width="55" className="rounded-full" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-4">
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/">Home</Link>
          </li>
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="text-white hover:text-gray-100 border-r pr-4 border-white flex items-center font-poppins">
              Destinos <ChevronDownIcon className="w-5 h-5 ml-2" />
            </MenuButton>
            <MenuItems className="absolute mt-2 w-40 bg-sky-100 shadow-lg rounded-md py-1">
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
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/events">Eventos</Link>
          </li>
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/cruise">Cruzeiros</Link>
          </li>
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/bus">Ônibus</Link>
          </li>
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/services">Serviços</Link>
          </li>
          <li className="text-white hover:text-gray-100 border-r pr-4 border-white font-poppins">
            <Link to="/contact">Contato</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/social">Social</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/destinys/nacionais">Destinos Nacionais</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/destinys/internacionais">Destinos Internacionais</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/events">Eventos</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/cruise">Cruzeiros</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/bus">Ônibus</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/services">Serviços</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/contact">Contato</Link>
          </li>
          <li className="text-white hover:text-gray-100 font-poppins">
            <Link to="/social">Social</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
