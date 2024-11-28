import React from 'react';
import './nuevaPantalla.css';  // Puedes crear un nuevo CSS o reutilizar el existente

const PrincipalesPuntos = () => {
  return (
    <div className="pantalla-container">
      <h1 className="h1">Principales Puntos de la Ley</h1>
      
      <div className="contenido-container">
        <div className="punto-ley">
          <h3>Punto 1</h3>
          <p className="p">
            Aquí puedes escribir el primer punto importante de la ley...
          </p>
        </div>

        <div className="punto-ley">
          <h3>Punto 2</h3>
          <p className="p">
            Aquí puedes escribir el segundo punto importante de la ley...
          </p>
        </div>

        {/* Puedes agregar más puntos según necesites */}
      </div>
    </div>
  );
};

export default PrincipalesPuntos;