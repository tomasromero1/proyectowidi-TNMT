import React, { useState, useEffect } from 'react';
import './play.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './modules/components/firebase/firebase.config';

const Question = ({ question, options = [], onAnswer, feedback }) => {
  return (
    <div>
      <div className="question-container">
        <div className="question-box">
          <h2>{question}</h2>
        </div>
      </div>
      <div className="options-container">
        {options.length > 0 ? (
          options.map((option, index) => (
            <button key={index} onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))
        ) : (
          <p>No options available</p>
        )}
      </div>
      {feedback && (
        <div className="feedback-container">
          {feedback.isCorrect ? (
            <p>¡Correcto!</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es: {feedback.correctAnswer}</p>
          )}
        </div>
      )}
    </div>
  );
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "preguntas"));
      const fetchedQuestions = querySnapshot.docs.map(doc => ({
        question: doc.data().pregunta,
        options: doc.data().opciones,
        correct: doc.data().correcta,
      }));
      setQuestions(fetchedQuestions);
      setLoading(false); // Cuando terminan de cargarse las preguntas
    } catch (error) {
      console.error("Error fetching questions: ", error);
      setLoading(false); // En caso de error, detener la carga
    }
  };

  useEffect(() => {
    fetchQuestions(); 
  }, []);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        options: currentQuestion.options,
        feedback: { isCorrect, correctAnswer: currentQuestion.correct },
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Quiz completado");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar mientras cargan las preguntas
  }

  return (
    <div>
      {answeredQuestions.map((q, index) => (
        <Question
          key={index}
          question={q.question}
          options={q.options}
          onAnswer={() => {}} // No hacemos nada porque ya está respondido
          feedback={q.feedback}
        />
      ))}
      {currentQuestionIndex < questions.length && (
        <Question
          question={questions[currentQuestionIndex]?.question}
          options={questions[currentQuestionIndex]?.options}
          onAnswer={handleAnswer}
          feedback={null} // No hay feedback hasta que el usuario responda
        />
      )}
    </div>
  );
};

export default Quiz;
