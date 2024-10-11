// import logo from "./logo.svg";
import {TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";
import "./App.css";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
    <div className="App">
      <header className="App-header">
        <span>My App with React UI</span>
        <TonConnectButton />
      </header>
    </div>
    </TonConnectUIProvider>
  );
}

export default App;
