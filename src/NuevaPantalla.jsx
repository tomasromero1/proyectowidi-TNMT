import React from 'react';
import './nuevaPantalla.css';
import { Link } from 'react-router-dom';

const NuevaPantalla = () => {
    return (
      <div className="pantalla-container">
        <h1 className="h1">Informacion Legal.</h1>

        <div className="contenido-container">
          <h2 className="h3">Marco Legislativo.</h2>
          <p className="p">
          La Ley Nacional 26.150 y el Programa Nacional de Educación Sexual Integral creado a partir de ella garantizan a nivel nacional, provincial, municipal y en la Ciudad Autónoma de Buenos Aires el derecho a recibir Educación Sexual Integral (ESI) tanto en escuelas de gestión estatal como privada, laicas o confesionales. Incluye a todos los niveles educativos: inicial, primario, secundario y terciario no universitario y a la formación docente, adecuando los contenidos de manera gradual, de acuerdo a la edad de los estudiantes.
          </p>
        </div>
<div className="botones-container">
        <button className="boton-principal">
          <Link to="/principales-puntos">
            Principales puntos de la Ley.
          </Link>
          </button>
      </div>
    </div>
  );
};

export default NuevaPantalla;