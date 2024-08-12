import './play.css';
import React, { useState } from 'react';

const questions = [
  { 
    id: 1, 
    question: "¿La ESI es obligatoria en todas las escuelas?", 
    options: ["Sí", "No", "No se"], 
    correctAnswer: "Sí" 
  },
  { 
    id: 2, 
    question: "¿La ESI solo trata sobre sexualidad?", 
    options: ["Sí", "No"], 
    correctAnswer: "No" 
  },
  //
];

function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  const handleAnswerSelection = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const userMessage = { text: selectedOption, isUser: true };
    let newMessages = [...messages, userMessage];

    if (selectedOption === currentQuestion.correctAnswer) {
      newMessages = [...newMessages, { text: "¡Correcto!", isUser: false }];
    } else {
      newMessages = [...newMessages, { text: "Incorrecto. La respuesta correcta es: " + currentQuestion.correctAnswer, isUser: false }];
    }

    setMessages(newMessages);

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.isUser ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
        {currentQuestionIndex < questions.length && (
          <div className="chat-bubble bot">
            {questions[currentQuestionIndex].question}
          </div>
        )}
      </div>
      {currentQuestionIndex < questions.length && (
        <div className="options-container">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default Chat;
