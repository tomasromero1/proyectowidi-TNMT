// Importamos React y el archivo de estilos
import React from 'react';
import './nuevaPantalla.css';

// Definimos el componente funcional NuevaPantalla
const NuevaPantalla = () => {
    return (
      // Contenedor principal que envuelve toda la pantalla
      <div className="pantalla-container">
        {/* Título principal de la página */}
        <h1 className="h1">HOLA COMO ESTAN.</h1>
        
        {/* Contenedor para el contenido principal */}
        <div className="contenido-container">
          {/* Subtítulo de la sección */}
          <h3 className="h3">Subtítulo</h3>
          {/* Párrafo de texto */}
          <p className="p">
            Contenido de ejemplo. Aquí puedes colocar tu texto.
          </p>
        </div>
{/* Contenedor para los botones de acción */}
<div className="botones-container">
        <button className="boton-principal">Botón 1</button>
        <button className="boton-principal">Botón 2</button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder utilizarlo en otras partes de la aplicación
export default NuevaPantalla;