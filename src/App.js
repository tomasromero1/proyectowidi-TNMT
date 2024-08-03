import './App.css';
import { Header } from "./components/header/header";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import React from 'react';

import Home from './home';
import Info from './informacion';
import Play from './play';
import './components/footer/footer.css'

import homeIcon from './logo.svg';  
import infoIcon from './logo.svg';  
import playIcon from './logo.svg';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
      <div>
        <footer className="footer">
        <div className="footer-button">
          <img src={homeIcon} alt="Inicio" className="button-icon"/>
          <Link to="/home">Inicio</Link>
        </div>
        <div className="footer-button">
          <img src={infoIcon} alt="Información" className="button-icon"/>
          <Link to="/informacion">Información</Link>
        </div>
        <div className="footer-button">
          <img src={playIcon} alt="Jugar" className="button-icon"/>
          <Link to="/play">Jugar</Link>
        </div>
      </footer>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/informacion" element={<Info />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
