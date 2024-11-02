import './App.css';
import { Header } from "./modules/components/header/header";
import { Footer } from "./modules/components/footer/Footer";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Info from './informacion';
import Play from './play';
import Boton from './modules/components/usuarios/Usuario';
import UserManagement from './modules/components/CRUD/user';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Informacion" element={<Info />} />
            <Route path="/Play" element={<Play />} />
            <Route path="/Usuario" element={<Boton />} />
            <Route path="/User" element={<UserManagement />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
