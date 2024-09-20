import React, { useState, useEffect } from 'react';
import './play.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './modules/components/firebase/firebase.config';

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
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, "preguntas")); 
    const fetchedQuestions = querySnapshot.docs.map(doc => ({
      question: doc.data().pregunta,    
      options: doc.data().opciones,     
      correct: doc.data().correcta      
    }));
    setQuestions(fetchedQuestions);
  };

  useEffect(() => {
    fetchQuestions(); 
  }, []);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;

    setAnsweredQuestions([...answeredQuestions, { 
      question: currentQuestion.question, 
      options: currentQuestion.options,
      feedback: { isCorrect, correctAnswer: currentQuestion.correct } 
    }]);

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
          question={questions[currentQuestionIndex]?.question}
          options={questions[currentQuestionIndex]?.options}
          onAnswer={handleAnswer}
          feedback={null}
        />
      )}
    </div>
  );
};

export default Quiz;
