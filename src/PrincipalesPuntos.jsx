import React from 'react';
import './nuevaPantalla.css';  
const PrincipalesPuntos = () => {
  
  return (
    <div className="pantalla-container">
      <h1 className="h1">Principales Puntos de la Ley</h1>
      
      <div className="contenido-container">
        <div className="punto-ley">
          <h3>Punto 1</h3>
          <p className="p">
          Los contenidos trabajados deben ser pertinentes, precisos, confiables y actualizados; deben buscar prevenir los problemas relacionados con la Salud Sexual y Reproductiva en particular y procurar igualdad de trato y oportunidades para varones y mujeres.
          </p>
        </div>
        <div className="punto-ley">
          <h3>Punto 2</h3>
          <p className="p">
          El abordaje integral de la educación sexual implica trabajar sobre aspectos biológicos, psicológicos, sociales, afectivos y éticos a partir de contenidos transversales a todas las materias y de forma sistemática.
          </p>
        </div>
        <div className="punto-ley">
          <h3>Punto 3</h3>
          <p className="p">
          La transversalidad debe orientarse a asegurar la inclusión y respeto de todas las personas y situaciones vinculadas a la salud sexual y reproductiva y a generar espacios de escucha, diálogo y reflexión ante las situaciones vinculadas a estas temáticas que emergen en el contexto escolar.
          </p>
        </div>
        <div className="punto-ley">
          <h3>Punto 4</h3>
          <p className="p">
          La implementación de la ESI es responsabilidad de todos las personas que forman una institución educativa y debe tenerse en cuenta en cada proyecto institucional.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrincipalesPuntos;