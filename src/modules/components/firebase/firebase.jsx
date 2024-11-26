import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function Preguntas() {
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
    const unsubscribe = db.collection('preguntas').onSnapshot((snapshot) => {
        const preguntasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setPreguntas(preguntasData);
    });
    return (
        <div>
          <h2>Preguntas</h2>
          <ul>
            {preguntas.map((pregunta) => (
              <li key={pregunta.id}>
                <strong>{pregunta.pregunta}</strong>
                <p>Por {pregunta.usuario}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
};