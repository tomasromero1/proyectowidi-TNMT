import './question.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase.config.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
  const [editQuestionId, setEditQuestionId] = useState(null);

  // Función para cargar preguntas desde Firestore
  const fetchQuestions = async () => {
    const questionsCollection = collection(db, "preguntas");
    const questionsSnapshot = await getDocs(questionsCollection);
    const questionList = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuestions(questionList);
  };

  // Función para agregar una nueva pregunta
  const addQuestion = async () => {
    if (!newQuestionText || !newCorrectAnswer) {
      alert('Por favor, completa todos los campos');
      return;
    }
    await addDoc(collection(db, "preguntas"), {
      pregunta: newQuestionText,
      correcta: newCorrectAnswer,
    });
    setNewQuestionText('');
    setNewCorrectAnswer('');
    fetchQuestions(); // Refrescar lista de preguntas
  };

  // Función para editar una pregunta
  const startEdit = (question) => {
    setEditQuestionId(question.id);
    setNewQuestionText(question.pregunta);
    setNewCorrectAnswer(question.correcta);
  };

  // Función para actualizar una pregunta
  const updateQuestion = async () => {
    const questionRef = doc(db, "preguntas", editQuestionId);
    await updateDoc(questionRef, {
      pregunta: newQuestionText,
      correcta: newCorrectAnswer,
    });
    setEditQuestionId(null);
    setNewQuestionText('');
    setNewCorrectAnswer('');
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
                  <td>
                    <select
                      value={newCorrectAnswer}
                      onChange={(e) => setNewCorrectAnswer(e.target.value)}
                    >
                      <option value="">Seleccione respuesta</option>
                      <option value="Verdadero">Verdadero</option>
                      <option value="Falso">Falso</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={updateQuestion}>Guardar</button>
                    <button onClick={() => setEditQuestionId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{question.pregunta}</td>
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

      {/* Formulario para agregar nueva pregunta */}
      <div className="form-container">
        <h3>Ingresar Pregunta</h3>
        <input
          type="text"
          className="question-input"
          placeholder="Texto de la pregunta"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
        />
        <div className="answer-selector">
          <select
            className="answer-select"
            value={newCorrectAnswer}
            onChange={(e) => setNewCorrectAnswer(e.target.value)}
          >
            <option value="">Seleccione respuesta correcta</option>
            <option value="Verdadero">Verdadero</option>
            <option value="Falso">Falso</option>
          </select>
        </div>
        <button className="add-btn" onClick={addQuestion}>Agregar Pregunta</button>
      </div>
    </div>
  );
};

export default QuestionManagement;
