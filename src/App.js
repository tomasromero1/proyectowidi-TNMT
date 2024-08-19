import './App.css';
import { Header } from "./modules/components/header/header";
import { Footer } from "./modules/components/footer/footer";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="content-container">
        {}
        <Footer/>
      </div>
    </div>
  );
}

export default App;
