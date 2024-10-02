import './App.css';
import { Header } from "./modules/components/header/header";
import { Footer } from "./modules/components/footer/footer";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Info from './informacion';
import Play from './play';
import Boton from './modules/components/usuarios/usuario';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/informacion" element={<Info />} />
            <Route path="/play" element={<Play />} />
            <Route path="/usuario" element={<Boton />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
