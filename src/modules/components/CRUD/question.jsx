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

}