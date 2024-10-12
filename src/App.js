// import logo from "./logo.svg";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./App.css";
import Header from './components/Header/Header';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
    <div className="App">
     <Header />
     <main>
      Home page
     </main>
    </div>
    </TonConnectUIProvider>
  );
}

export default App;
