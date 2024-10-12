import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";

const Header = () => {
  return (
    <header>
      <nav class="flex items-center justify-end h-16">
        <ul className="flex w-1/4 justify-around space-x-12 items-center">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
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
