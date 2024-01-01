import React from 'react';

const QuestionBox = ({ question, selectedOption, handleOptionChange, handleNextQuestion }) => {
  const renderOptions = () => {
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
            onChange={(e) => handleOptionChange(e, index)}
          />
          {option}
        </label>
      </div>
    ));
  };

  return (
    <div className="question-box">
      <div className="question-status">
        Attending <span>{question.index + 1}</span>/{question.totalQuestions} questions
      </div>
      <h2>{`Question ${question.index + 1}: ${question.text}`}</h2>
      {renderOptions()}
      <button onClick={handleNextQuestion} disabled={!selectedOption}>
        Next Question
      </button>
    </div>
  );
};

export default QuestionBox;
