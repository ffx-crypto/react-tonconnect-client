// import logo from "./logo.svg";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./App.css";
import Header from './components/Header/Header';

function App() {
  const manifestUrl = process.env.REACT_APP_MANIFEST_URL;
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl} >
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
