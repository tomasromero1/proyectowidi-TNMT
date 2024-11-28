// Importamos React y el archivo de estilos
import React from 'react';
import './nuevaPantalla.css';

// Definimos el componente funcional NuevaPantalla
const NuevaPantalla = () => {
    return (
      // Contenedor principal que envuelve toda la pantalla
      <div className="pantalla-container">
        {/* Título principal de la página */}
        <h1 className="h1">Informacion Legal.</h1>

        {/* Contenedor para el contenido principal */}
        <div className="contenido-container">
          {/* Subtítulo de la sección */}
          <h2 className="h3">Marco Legislativo.</h2>
          {/* Párrafo de texto */}
          <p className="p">
          La Ley Nacional 26.150 y el Programa Nacional de Educación Sexual Integral creado a partir de ella garantizan a nivel nacional, provincial, municipal y en la Ciudad Autónoma de Buenos Aires el derecho a recibir Educación Sexual Integral (ESI) tanto en escuelas de gestión estatal como privada, laicas o confesionales. Incluye a todos los niveles educativos: inicial, primario, secundario y terciario no universitario y a la formación docente, adecuando los contenidos de manera gradual, de acuerdo a la edad de los estudiantes.
          </p>
        </div>
{/* Contenedor para los botones de acción */}
<div className="botones-container">
        <button className="boton-principal">Principales puntos de la Ley.</button>
        <button className="boton-principal">Botón 2</button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de la aplicación
export default NuevaPantalla;