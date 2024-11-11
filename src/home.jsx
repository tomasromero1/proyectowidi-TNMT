import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2 className='title'>Inicio</h2>
      <div className='home'>
      <p>La Educación Sexual Integral (ESI) es una política pública reconocida por ley que busca enseñar habilidades y conocimientos sobre la sexualidad, permitiendo a los jóvenes tomar decisiones informadas y autónomas</p>
      </div>
      <button className='info'>
          <Link to="/Informacion">
              <p>Más informacion sobre ESI</p>
           </Link>
      </button>
    </div>
  );
}

export default Home;
