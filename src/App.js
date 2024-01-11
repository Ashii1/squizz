import React, { useState, useEffect } from 'react';
import Login from './Login';
import Quiz from './Quiz';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [categories] = useState([
    'Linux',
    'BASH',
    'PHP',
    'Docker',
    'HTML',
    'MySQL',
    'WordPress',
    'Laravel',
    'Kubernetes',
    'JavaScript',
    'DevOps',
    'Python', 
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [error, setError] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState('');


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (selectedCategory) {
          const response = await fetch(
            `https://quizapi.io/api/v1/questions?category=${selectedCategory}&apiKey=ueQVeLZhg9j4sXHWozEhs7j0p1qnJkcWvxGAgIuA`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch questions');
          }
          const data = await response.json();

          setQuestions(data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
        setError('Failed to fetch questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const handleLogin = (enteredUsername) => {
    if (enteredUsername.trim() !== '') {
      setIsLoggedIn(true);
      setUsername(enteredUsername);
      setError(null); 
    } else {
      setError('Username cannot be empty');
        setTimeout(() => setError(null), 5000); 

    }
  };


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setError(null);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setTotalPoints(0);
    
  };

  const handleOptionChange = (e, index) => {
    setSelectedOptionIndex(index);
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correctAnswerIndex;
    Object.values(currentQuestion.correct_answers).forEach((item, index) => {
      if (item === 'true') {
        correctAnswerIndex = index;
      }
    });

    if (currentQuestion) {
      if (selectedOptionIndex === correctAnswerIndex) {
        setTotalPoints((prevPoints) => prevPoints + 1);
      }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption('');
    }
  
  };

  return (
    <div className="app-container">
      {!isLoggedIn && <Login setUsername={setUsername} onLogin={() => handleLogin(username)} />}
       
      {isLoggedIn && (
        <Quiz
          isLoggedIn={isLoggedIn}
          username={username}
          selectedCategory={selectedCategory}
          categories={categories}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedOption={selectedOption}
          handleCategoryChange={handleCategoryChange}
          handleOptionChange={handleOptionChange}
          handleNextQuestion={handleNextQuestion}
          totalPoints={totalPoints}
          error={error}
          />
          )}
    
          
        </div>
      );
    };
export default App;
