import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

const Header = () => {
    return (
      <header>
        <h1>My Website Header</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li>
            <TonConnectButton />
            </li>
          </ul>
        </nav>
      </header>
    );
  };
export default Header;