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
  const [currentStreak, setCurrentStreak] = useState(0); // Score actuel = série actuelle
  const [maxStreak, setMaxStreak] = useState(0); // Meilleure série historique
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
      console.error("Erreur lors de la vérification d'authentification:", error);
    }
  }

  async function loadUserScore() {
    try {
      const response = await fetch("/api/scores");
      const scores = await response.json();
      const gameScore = scores.find(s => s.gameId === game.id);
      if (gameScore) {
        setUserScore(gameScore);
        setMaxStreak(gameScore.streak); // Charger la meilleure série historique
      }
    } catch (error) {
      console.error("Erreur lors du chargement du score:", error);
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
          score: streak, // Score actuel
          streak: streak, // Meilleure série historique
          totalQuestions: 1 // On compte juste cette partie
        }),
      });
      
      // Recharger les scores pour mettre à jour l'interface
      await loadUserScore();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du score:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = input.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      // Bonne réponse : continuer la série
      setCurrentStreak(prev => prev + 1);
      setFeedback("✅ Bonne réponse ! Continuez !");
      
      // Passer à la question suivante
      setTimeout(() => {
        setFeedback("");
        setInput("");
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    } else {
      // Mauvaise réponse : GAME OVER
      setFeedback(`❌ Mauvaise réponse. C'était ${currentQuestion.answer}`);
      
      // Vérifier si c'est un nouveau record
      if (currentStreak > maxStreak) {
        const newMaxStreak = currentStreak;
        setMaxStreak(newMaxStreak);
        if (isAuthenticated) {
          // Sauvegarder avec la nouvelle meilleure série
          saveScore(newMaxStreak);
        }
      }
      
      // Game Over après un délai
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  }

  function restartGame() {
    // Générer une nouvelle liste aléatoire de questions
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
        <h2 className="text-2xl font-bold mb-4 text-terminal-green">Game Over !</h2>
        <div className="bg-terminal-gray border border-terminal-green rounded p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-terminal-green">{currentStreak}</div>
              <div className="text-sm text-gray-400">Série terminée</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-terminal-green">{maxStreak}</div>
              <div className="text-sm text-gray-400">Meilleure série</div>
            </div>
          </div>
        </div>
        
        {userScore && (
          <div className="mb-6 p-4 bg-terminal-gray border border-terminal-green rounded">
            <h3 className="text-lg font-bold mb-2">Vos records</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Meilleure série :</span>
                <span className="ml-2 font-bold text-terminal-green">{userScore.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Parties jouées :</span>
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
    <div className="max-w-2xl mx-auto">
      {/* En-tête avec statistiques */}
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

      {/* Question actuelle */}
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
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="mt-4 p-3 border rounded text-center text-lg">
          {feedback}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-terminal-gray border border-gray-600 rounded">
        <h3 className="text-sm font-bold mb-2 text-gray-400">Comment jouer :</h3>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Répondez correctement pour continuer votre série</li>
          <li>• Une erreur = Game Over et recommencement à zéro</li>
          <li>• Votre meilleure série est sauvegardée</li>
        </ul>
      </div>
    </div>
  );
} 