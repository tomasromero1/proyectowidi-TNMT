import './question.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase.config.js';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [editQuestionId, setEditQuestionId] = useState(null); // Estado para la pregunta en edición
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  // Función para cargar preguntas desde Firestore
  const fetchQuestions = async () => {
    const questionsCollection = collection(db, "preguntas");
    const questionSnapshot = await getDocs(questionsCollection);
    const questionList = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuestions(questionList);
  };

  // Función para manejar el inicio de edición
  const startEdit = (question) => {
    setEditQuestionId(question.id);
    setNewQuestionText(question.pregunta); // Cargar el texto existente de la pregunta
    setNewCorrectAnswer(question.correcta); // Cargar la respuesta correcta existente
  };

  // Función para actualizar la pregunta y la respuesta correcta
  const updateQuestion = async () => {
    if (!newQuestionText || !newCorrectAnswer) return; // Validación básica

    const questionRef = doc(db, "preguntas", editQuestionId);
    await updateDoc(questionRef, { pregunta: newQuestionText, correcta: newCorrectAnswer });
    setEditQuestionId(null); // Terminar edición
    fetchQuestions(); // Refrescar lista de preguntas
  };

  // Función para eliminar una pregunta
  const deleteQuestion = async (questionId) => {
    const questionRef = doc(db, "preguntas", questionId);
    await deleteDoc(questionRef);
    fetchQuestions(); // Refrescar lista de preguntas
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Gestión de Preguntas</h2>
      <table>
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Opciones</th>
            <th>Respuesta Correcta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              {editQuestionId === question.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                    />
                  </td>
                  <td>{question.opciones[0]} / {question.opciones[1]}</td>
                  <td>
                    <input
                      type="text"
                      value={newCorrectAnswer}
                      onChange={(e) => setNewCorrectAnswer(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={updateQuestion}>Guardar</button>
                    <button onClick={() => setEditQuestionId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{question.pregunta}</td>
                  <td>{question.opciones[0]} / {question.opciones[1]}</td>
                  <td>{question.correcta}</td>
                  <td>
                    <button onClick={() => startEdit(question)}>Editar</button>
                    <button onClick={() => deleteQuestion(question.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionManagement;
