import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-end h-16">
        <ul className="flex w-1/4 justify-around space-x-12 items-center">
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
        <div className="flex justify-center w-1/6">
          <TonConnectButton />
        </div>
      </nav>
    </header>
  );
};
export default Header;
