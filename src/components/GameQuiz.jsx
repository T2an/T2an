import React, { useState, useEffect } from "react";

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GameQuiz({ game }) {
  const [questions, setQuestions] = useState(() => shuffle(game.questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      
      if (data.authenticated) {
        loadUserScore();
      }
    } catch (error) {
      console.error("Authentication check error:", error);
    }
  }

  async function loadUserScore() {
    try {
      const response = await fetch("/api/scores");
      const scores = await response.json();
      const gameScore = scores.find(s => s.gameId === game.id);
      if (gameScore) {
        setUserScore(gameScore);
        setMaxStreak(gameScore.streak);
      }
    } catch (error) {
      console.error("Score loading error:", error);
    }
  }

  async function saveScore(streak) {
    if (!isAuthenticated) return;

    try {
      await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: game.id,
          score: streak,
          streak: streak,
          totalQuestions: 1
        }),
      });
      
      await loadUserScore();
    } catch (error) {
      console.error("Score saving error:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = input.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setCurrentStreak(prev => prev + 1);
      setFeedback("✅ Correct! Keep going!");
      
      setTimeout(() => {
        setFeedback("");
        setInput("");
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    } else {
      setFeedback(`❌ Wrong answer. It was ${currentQuestion.answer}`);
      
      if (currentStreak > maxStreak) {
        const newMaxStreak = currentStreak;
        setMaxStreak(newMaxStreak);
        if (isAuthenticated) {
          saveScore(newMaxStreak);
        }
      }
      
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  }

  function restartGame() {
    setQuestions(shuffle(game.questions));
    setCurrentQuestionIndex(0);
    setCurrentStreak(0);
    setFeedback("");
    setGameOver(false);
    setInput("");
  }

  if (gameOver) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-terminal-green">Game Over!</h2>
        <div className="bg-terminal-gray border border-terminal-green rounded p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-terminal-green">{currentStreak}</div>
              <div className="text-sm text-gray-400">Current streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-terminal-green">{maxStreak}</div>
              <div className="text-sm text-gray-400">Best streak</div>
            </div>
          </div>
        </div>
        
        {userScore && (
          <div className="mb-6 p-4 bg-terminal-gray border border-terminal-green rounded">
            <h3 className="text-lg font-bold mb-2">Your records</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Best streak:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Games played:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.totalQuestions}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-x-4">
          <button
            className="px-6 py-2 border border-terminal-green rounded hover:bg-terminal-gray transition-colors"
            onClick={restartGame}
          >
            Play Again
          </button>
          <a
            href="/games"
            className="px-6 py-2 border border-gray-500 rounded hover:bg-terminal-gray transition-colors"
          >
            Back to Games
          </a>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-terminal-gray border border-terminal-green rounded p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-terminal-green">{currentStreak}</div>
            <div className="text-xs text-gray-400">Current streak</div>
          </div>
          <div>
            <div className="text-lg font-bold text-terminal-green">{maxStreak}</div>
            <div className="text-xs text-gray-400">Best streak</div>
          </div>
          <div>
            <div className="text-lg font-bold text-terminal-green">{currentQuestionIndex + 1}</div>
            <div className="text-xs text-gray-400">Question</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestionIndex + 1}
        </h2>
        <p className="mb-4 text-lg">{currentQuestion.question}</p>
        
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded bg-terminal-gray text-terminal-green font-mono"
            placeholder="Your answer..."
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 border border-terminal-green rounded hover:bg-terminal-gray transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {feedback && (
        <div className="mt-4 p-3 border rounded text-center text-lg">
          {feedback}
        </div>
      )}

      <div className="mt-6 p-4 bg-terminal-gray border border-gray-600 rounded">
        <h3 className="text-sm font-bold mb-2 text-gray-400">How to play:</h3>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Answer correctly to continue your streak</li>
          <li>• One mistake = Game Over and restart from zero</li>
          <li>• Your best streak is automatically saved</li>
        </ul>
      </div>
    </div>
  );
} 