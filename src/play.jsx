import React, { useState } from 'react';
import './play.css'

const questions = [
  {
    question: "El sistema sexo/género se basa en una lógica binaria",
    options: ["Verdadero", "Falso"],
    correct: "Verdadero"
  },
  {
    question: "La identidad de género siempre responde al género asignado al nacer",
    options: ["Verdadero", "Falso"],
    correct: "Falso"
  },
  {
    question: "¿El término sexo está asociado a características biológicas?",
    options: ["Verdadero", "Falso"],
    correct: "Verdadero"
  },
  {
    question: "¿El género está determinado por características biológicas?",
    options: ["Verdadero", "Falso"],
    correct: "Falso"
  },
  {
    question: "¿Todas las personas tienen derecho a ser tratadas como se autoperciben?",
    options: ["Verdadero", "Falso"],
    correct: "Verdadero"
  },
  // Agrega más preguntas aquí
];

const Question = ({ question, options, onAnswer, feedback }) => {
  return (
    <div>
      <div className="question-container">
        <div className="question-box">
          <h2>{question}</h2>
        </div>
      </div>
      <div className="options-container">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className="feedback-container">
          {feedback.isCorrect
            ? <p>¡Correcto!</p>
            : <p>Incorrecto. La respuesta correcta es: {feedback.correctAnswer}</p>}
        </div>
      )}
    </div>
  );
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;

    // Guarda la pregunta respondida junto con la retroalimentación
    setAnsweredQuestions([...answeredQuestions, { 
      question: currentQuestion.question, 
      options: currentQuestion.options,
      feedback: { isCorrect, correctAnswer: currentQuestion.correct } 
    }]);

    // Avanza a la siguiente pregunta
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      {answeredQuestions.map((q, index) => (
        <Question
          key={index}
          question={q.question}
          options={q.options}
          onAnswer={() => {}}
          feedback={q.feedback}
        />
      ))}
      {currentQuestionIndex < questions.length && (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
          feedback={null} // No mostrar retroalimentación para la pregunta actual hasta que sea respondida
        />
      )}
    </div>
  );
};

export default Quiz;
