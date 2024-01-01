// Quiz.js
import React from 'react';

const Quiz = ({
  isLoggedIn,
  username,
  selectedCategory,
  categories,
  questions,
  currentQuestionIndex,
  selectedOption,
  handleCategoryChange,
  handleOptionChange,
  handleNextQuestion,
  totalPoints,
  error,
}) => {
  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <p className="welcome-message">{username}</p>
      <label>
        Select Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Choose a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedCategory && !error && questions.length > 0 && currentQuestionIndex < questions.length && (
        <div className="question-box">
          <div className="question-status">
            Attending <span>{currentQuestionIndex + 1}</span>/{questions.length} questions
          </div>
          <h2>{`Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`}</h2>
          {renderOptions(questions[currentQuestionIndex], selectedOption, handleOptionChange)}
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next Question
          </button>
        </div>
      )}

      {currentQuestionIndex === questions.length && (
        totalPoints > 0 ? (
          <div>
            <h2>Quiz Completed</h2>
            <p>Congrats {username} You Scored {`Congrats ${username} You Scored : ${totalPoints} out of ${questions.length}`}</p>
          </div>
        ) : <h2> Select Category To start The Assessment</h2>
      )}
    </div>
  );
};

const renderOptions = (question, selectedOption, handleOptionChange) => {
    let options = [];
  
    if (typeof question.answers === 'string') {
      // Handle options as a string (comma-separated)
      options = question.answers.split(',').map((option) => option.trim());
    } else if (Array.isArray(question.answers)) {
      // Handle options as an array
      options = question.answers.map((option) => option.trim());
    } else if (typeof question.answers === 'object') {
      // Handle options as an object
      options = Object.values(question.answers).filter((value) => value !== null).map((option) => option.trim());
    } else {
      console.error('Invalid options format:', question.answers);
      return <p>Error: Invalid options format</p>;
    }
  
    return options.map((option, index) => (
      <div key={index}>
        <label>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={(e => handleOptionChange(e, index))}
          />
          {option}
        </label>
      </div>
    ));
  };
export default Quiz;
