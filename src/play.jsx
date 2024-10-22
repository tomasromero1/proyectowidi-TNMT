import React, { useState, useEffect } from 'react';
import './Play.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './modules/components/firebase/Firebase.config.js';
import PulseLoader from 'react-spinners/PulseLoader';

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
            <p>Incorrecto.</p>
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
  const [loading, setLoading] = useState(true); 
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(true);

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "preguntas"));
      const fetchedQuestions = querySnapshot.docs.map(doc => ({
        question: doc.data().pregunta,
        options: doc.data().opciones,
        correct: doc.data().correcta,
      }));
      setQuestions(fetchedQuestions);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching questions: ", error);
      setLoading(false); 
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
      setQuizCompleted(true); 
    }
  };

  const closeCompletionMessage = () => {
    setShowCompletionMessage(false);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setShowCompletionMessage(true);
  };

  if (loading) {
    return (
      <div className="loader-container"> 
        <PulseLoader color={"#36d7b7"} loading={loading} size={15} /> 
      </div>
    );
  }

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
      {!quizCompleted && currentQuestionIndex < questions.length && (
        <Question
          question={questions[currentQuestionIndex]?.question}
          options={questions[currentQuestionIndex]?.options}
          onAnswer={handleAnswer}
          feedback={null}
        />
      )}
      {quizCompleted && showCompletionMessage && (
        <div className="quiz-completed-overlay">
          <div className="quiz-completed-window">
            <button className="close-button" onClick={closeCompletionMessage}>✖</button>
            <h2>¡Has completado el quiz!</h2>
            <p>Respondiste correctamente {answeredQuestions.filter(q => q.feedback.isCorrect).length} de {questions.length} preguntas.</p>
            <p>Gracias por participar.</p>
            <button className="reset-button" onClick={resetQuiz}>Reiniciar Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
