import React, { useState, useEffect } from 'react';
import axios from 'axios';

// QuizPage Component
const QuizPage = ({ quizData, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
    if (!showAnswer) {
      setSelectedOption(option);
      setShowAnswer(true);
      if (option === quizData[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setShowAnswer(false);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      await axios.post('https://virtual-i6x5.onrender.com/save', {
        // userName,
        // score,
        // totalQuestions,
        // correctAnswers
        userName:'Guest',
        score: score,
        totalQuestions: quizData.length,
        correctAnswers: 0,
        date: new Date().toISOString(),
      });
      onFinish(score);
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      alert('Failed to submit quiz result');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.quizBox}>
        <h2 style={styles.questionNumber}>
          Question {currentQuestion + 1} of {quizData.length}
        </h2>
        <h3 style={styles.questionText}>{quizData[currentQuestion].question}</h3>
        <div style={styles.optionsContainer}>
          {quizData[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              style={{
                ...styles.optionButton,
                backgroundColor:
                  showAnswer
                    ? option === quizData[currentQuestion].answer
                      ? 'green'
                      : option === selectedOption
                      ? 'red'
                      : 'white'
                    : 'white',
                color: showAnswer ? 'white' : 'black',
              }}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswer &&
          (currentQuestion === quizData.length - 1 ? (
            <button onClick={handleSubmitQuiz} style={styles.submitButton}>
              Submit Quiz
            </button>
          ) : (
            <button onClick={handleNextQuestion} style={styles.submitButton}>
              Next Question
            </button>
          ))}
      </div>
    </div>
  );
};

// ResultPage Component
const ResultPage = ({ score, total, onRestart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.resultBox}>
        <h2 style={styles.resultHeading}>Quiz Completed!</h2>
        <h3 style={styles.resultText}>
          Your Score: {score} / {total} (Result saved!)
        </h3>
        <button onClick={onRestart} style={styles.restartButton}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('https://virtual-i6x5.onrender.com/alldata/quiz');
        setQuizData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
  };

  const handleRestartQuiz = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>
        Loading Quiz...
      </h2>
    );
  }

  if (score !== null) {
    return <ResultPage score={score} total={quizData.length} onRestart={handleRestartQuiz} />;
  }

  return <QuizPage quizData={quizData} onFinish={handleFinishQuiz} />;
}

// Styling
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#064420',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  quizBox: {
    backgroundColor: '#092c16',
    padding: '30px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0px 0px 20px rgba(0,255,100,0.5)',
    color: 'white',
    textAlign: 'center',
  },
  questionNumber: {
    marginBottom: '15px',
    color: '#a0ffa0',
  },
  questionText: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  optionButton: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: '2px solid #a0ffa0',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s',
  },
  submitButton: {
    marginTop: '10px',
    padding: '12px 25px',
    borderRadius: '10px',
    backgroundColor: '#38b000',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
  },
  resultBox: {
    backgroundColor: '#092c16',
    padding: '40px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0px 0px 20px rgba(0,255,100,0.5)',
  },
  resultHeading: {
    fontSize: '32px',
    color: '#a0ffa0',
    marginBottom: '20px',
  },
  resultText: {
    fontSize: '24px',
    color: 'white',
    marginBottom: '30px',
  },
  restartButton: {
    padding: '12px 30px',
    borderRadius: '10px',
    backgroundColor: '#38b000',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default App;