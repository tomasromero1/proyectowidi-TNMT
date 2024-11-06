import React, { useState, useEffect } from 'react';

function PreguntasRespuestas() {
const [preguntas, setPreguntas] = useState([]);

useEffect(() => {
    // Aquí realizarías la petición al backend para obtener las preguntas
    fetch('/api/preguntas')
    .then(response => response.json())
    .then(data => setPreguntas(data))
    .catch(error => console.error(error));
}, []);

return (
    <div>
    <h2>Preguntas y Respuestas</h2>
    <ul>
        {preguntas.map(pregunta => (
        <li key={pregunta.id}>
            <strong>{pregunta.pregunta}</strong>
            <ul>
            {pregunta.respuestas.map(respuesta => (
                <li key={respuesta.id}>{respuesta.texto}</li>
            ))}
            </ul>
        </li>
        ))}
    </ul>
    </div>
);
}
export default PreguntasRespuestas;
