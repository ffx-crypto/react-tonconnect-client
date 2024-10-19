// import logo from "./logo.svg";
import './polyfill';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sale from './pages/Sale';
import Contact from './pages/Contact';
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const manifestUrl = import.meta.env.VITE_MANIFEST_URL;
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TonConnectUIProvider>
  );
}

export default App;
