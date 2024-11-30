import React, { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo or Home link */}
        <div className="text-lg w-8 h-8 md:w-12 md:h-12 font-bold z-10">
          <Link to="/">
            <img
              src="logo-192x192.png"
              alt="FFX crypto logo"
              className="object-cover mb-2"
            />
          </Link>
        </div>


        {/* TonConnectButton */}
        <div className="flex md:w-1/3 w-content px-4 items-center justify-between md:justify-around">
          <TonConnectButton />
        {/* Hamburger Menu for small screens */}
        
          <div className="md:hidden burger-menu">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className=" ml-8"
            >
             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} /> } 
            </button>
          </div>
        
          {/* Desktop Navigation */}
          <ul className="hidden md:flex w-1/4 justify-around space-x-8 items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sale">Sale</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`menu ${isMenuOpen ? "menu-opened" : "menu-closed"}`}>
        <ul className="flex flex-col bg-white items-center space-y-4 py-4">
          {/* <li> */}
            {/* Close Button */}
            {/* <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
            >
              <FaTimes />
            </button>
          </li> */}
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/sale" onClick={() => setIsMenuOpen(false)}>
              Sale
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <div className="flex justify-center mt-4">
            <TonConnectButton />
          </div>
        </ul>
      </div>
    </header>
  );
};
export default Header;
