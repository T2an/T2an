import React, { useState, useEffect } from "react";

// Helper function for shuffling questions
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to normalize answers for comparison
function normalizeAnswer(answer) {
  // Remove extra spaces and convert to lowercase
  const cleaned = answer.trim().toLowerCase();
  
  // For department numbers, accept both formats (01 and 1, 02 and 2, etc.)
  if (/^\d+$/.test(cleaned)) {
    // If it's a number, pad with leading zero if it's a single digit
    const num = parseInt(cleaned, 10);
    if (num >= 1 && num <= 99) {
      return num.toString().padStart(2, '0');
    }
    // For DOM-TOM (971, 972, 973, 974, 976), return as is
    if (num >= 971 && num <= 976) {
      return num.toString();
    }
  }
  
  // Handle special cases like 2A, 2B (Corse)
  if (/^2[aAbB]$/.test(cleaned)) {
    return cleaned.toUpperCase();
  }
  
  return cleaned;
}

export default function GameQuiz({ game, mode = "blind" }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userScore, setUserScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    checkAuth();
    loadLeaderboard();
    loadGameData();
  }, [mode]);

  async function checkAuth() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadUserScore();
      }
    } catch (error) {
      console.error("Erreur de vérification d'authentification:", error);
    }
  }

  async function loadUserScore() {
    if (!isAuthenticated) return;
    try {
      const response = await fetch(`/api/scores?gameId=${game.id}&mode=${mode}`);
      const data = await response.json();
      if (data.userScore) {
        setUserScore(data.userScore);
        setMaxStreak(data.userScore.streak);
      }
    } catch (error) {
      console.error("Erreur de chargement du score utilisateur:", error);
    }
  }

  async function loadLeaderboard() {
    try {
      const response = await fetch(`/api/scores?gameId=${game.id}&mode=${mode}`);
      const data = await response.json();
      if (data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error("Erreur de chargement du classement:", error);
    }
  }

  async function loadGameData() {
    try {
      const response = await fetch(`/api/games/${game.name}?mode=${mode}`);
      const gameData = await response.json();
      setQuestions(shuffle(gameData.questions));
      setCurrentQuestionIndex(0);
      setCurrentStreak(0);
      setFeedback("");
      setGameOver(false);
      setInput("");
    } catch (error) {
      console.error("Erreur de chargement des données du jeu:", error);
    }
  }

  async function saveScore(streak) {
    if (!isAuthenticated) return;
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id, streak: streak, gameMode: mode }),
      });
      if (response.ok) {
        await loadUserScore();
        await loadLeaderboard();
      }
    } catch (error) {
      console.error("Erreur de sauvegarde du score:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = input.trim();
    const correctAnswer = currentQuestion.answer;

    // Normalize both answers for comparison
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);

    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    if (isCorrect) {
      setCurrentStreak((prev) => prev + 1);
      setFeedback("✅ Correct ! Continuez !");
      setTimeout(() => {
        setInput("");
        setFeedback("");
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setGameOver(true);
          // Sauvegarder le score final (victoire)
          saveScore(currentStreak + 1);
        }
      }, 1000);
    } else {
      setFeedback(`❌ Mauvaise réponse. C'était ${currentQuestion.answer}`);
      // Sauvegarder le score même en cas d'échec
      saveScore(currentStreak);
      setTimeout(() => {
        setGameOver(true);
      }, 3000);
    }
  }

  function handleChoiceClick(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    // Normalize both answers for comparison
    const normalizedChoice = normalizeAnswer(choice);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);

    const isCorrect = normalizedChoice === normalizedCorrectAnswer;

    if (isCorrect) {
      setCurrentStreak((prev) => prev + 1);
      setFeedback("✅ Correct ! Continuez !");
      setTimeout(() => {
        setFeedback("");
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setGameOver(true);
          // Sauvegarder le score final (victoire)
          saveScore(currentStreak + 1);
        }
      }, 1000);
    } else {
      setFeedback(`❌ Mauvaise réponse. C'était ${currentQuestion.answer}`);
      // Sauvegarder le score même en cas d'échec
      saveScore(currentStreak);
      setTimeout(() => {
        setGameOver(true);
      }, 3000);
    }
  }

  function restartGame() {
    setQuestions(shuffle([...questions]));
    setCurrentQuestionIndex(0);
    setCurrentStreak(0);
    setFeedback("");
    setGameOver(false);
    setInput("");
  }

  if (questions.length === 0) {
    return <div className="text-center p-8 text-terminal-green">Chargement...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-terminal-green">🎉 Félicitations !</h2>
        <div className="bg-terminal-gray border border-terminal-green rounded p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-terminal-green">{currentStreak}</div>
              <div className="text-sm text-gray-400">Réponses correctes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-terminal-green">{maxStreak}</div>
              <div className="text-sm text-gray-400">Meilleure série</div>
            </div>
          </div>
        </div>
        {isAuthenticated && userScore && (
          <div className="mb-6 p-4 bg-terminal-gray border border-terminal-green rounded">
            <h3 className="text-lg font-bold mb-2">Vos records</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Meilleure série:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Parties jouées:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.totalQuestions || 0}</span>
              </div>
            </div>
          </div>
        )}
        <div className="space-x-4">
          <button
            className="px-6 py-2 border border-terminal-green rounded hover:bg-terminal-gray transition-colors"
            onClick={restartGame}
          >
            Rejouer
          </button>
          <a
            href="/games"
            className="px-6 py-2 border border-gray-500 rounded hover:bg-terminal-gray transition-colors"
          >
            Retour aux jeux
          </a>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-terminal-green">💥 Game Over !</h2>
        <div className="bg-terminal-gray border border-terminal-green rounded p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-terminal-green">{currentStreak}</div>
              <div className="text-sm text-gray-400">Série actuelle</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-terminal-green">{maxStreak}</div>
              <div className="text-sm text-gray-400">Meilleure série</div>
            </div>
          </div>
        </div>
        {isAuthenticated && userScore && (
          <div className="mb-6 p-4 bg-terminal-gray border border-terminal-green rounded">
            <h3 className="text-lg font-bold mb-2">Vos records</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Meilleure série:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Parties jouées:</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.totalQuestions || 0}</span>
              </div>
            </div>
          </div>
        )}
        <div className="space-x-4">
          <button
            className="px-6 py-2 border border-terminal-green rounded hover:bg-terminal-gray transition-colors"
            onClick={restartGame}
          >
            Rejouer
          </button>
          <a
            href="/games"
            className="px-6 py-2 border border-gray-500 rounded hover:bg-terminal-gray transition-colors"
          >
            Retour aux jeux
          </a>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone de jeu principale */}
        <div className="lg:col-span-2">
          <div className="bg-terminal-gray border border-terminal-green rounded p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-terminal-green">{currentStreak}</div>
                <div className="text-xs text-gray-400">Série actuelle</div>
              </div>
              <div>
                <div className="text-lg font-bold text-terminal-green">{maxStreak}</div>
                <div className="text-xs text-gray-400">Meilleure série</div>
              </div>
              <div>
                <div className="text-lg font-bold text-terminal-green">{currentQuestionIndex + 1}</div>
                <div className="text-xs text-gray-400">Question</div>
              </div>
            </div>
          </div>

          <div className="bg-terminal-gray border border-terminal-green rounded p-4 mb-6">
            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="mb-4 text-lg">{currentQuestion.question}</p>

            {/* Mode Aveugle - Saisie manuelle */}
            {mode === "blind" && (
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded bg-terminal-gray text-terminal-green font-mono"
                  placeholder="Votre réponse..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-terminal-green rounded hover:bg-terminal-gray transition-colors"
                >
                  Valider
                </button>
              </form>
            )}

            {/* Mode Normal - Choix multiples */}
            {mode === "normal" && currentQuestion.choices && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                    className="p-3 border border-gray-600 rounded hover:border-terminal-green hover:bg-terminal-gray transition-colors text-left"
                  >
                    <span className="font-bold text-terminal-green mr-2">{String.fromCharCode(65 + index)}.</span>
                    {choice}
                  </button>
                ))}
              </div>
            )}
          </div>

          {feedback && (
            <div className="mt-4 p-3 border rounded text-center text-lg">
              {feedback}
            </div>
          )}

          <div className="mt-6 p-4 bg-terminal-gray border border-gray-600 rounded">
            <h3 className="text-sm font-bold mb-2 text-gray-400">Comment jouer :</h3>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Répondez correctement pour continuer votre série</li>
              <li>• Une erreur = Game Over et recommencez à zéro</li>
              <li>• Votre meilleure série est automatiquement sauvegardée</li>
              {mode === "blind" && <li>• Soyez précis dans vos réponses</li>}
              {mode === "normal" && <li>• Cliquez sur la bonne réponse parmi les 4 propositions</li>}
            </ul>
          </div>
        </div>

        {/* Classement */}
        <div className="lg:col-span-1">
          <div className="bg-terminal-gray border border-terminal-green rounded p-4 sticky top-4">
            <h3 className="text-lg font-bold mb-4 text-terminal-green">🏆 Top 10 Classement</h3>
            <div className="text-xs text-gray-400 mb-2">Mode: {mode === 'blind' ? 'Aveugle' : 'Normal'}</div>

            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((score, index) => (
                  <div key={score.id} className="flex justify-between items-center p-2 bg-black bg-opacity-20 rounded">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-gray-300' :
                        index === 2 ? 'text-amber-600' : 'text-gray-400'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="text-sm text-terminal-green font-mono">
                        {score.user.username}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-terminal-green">
                      {score.streak}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm py-4">
                Aucun score encore. Soyez le premier !
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 