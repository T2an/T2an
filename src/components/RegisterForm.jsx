import React, { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    if (pseudo.length < 3 || pseudo.length > 20 || !/^[a-zA-Z0-9_-]+$/.test(pseudo)) {
      setError("Le pseudo doit faire entre 3 et 20 caractères et ne contenir que des lettres, chiffres, tirets ou underscores.");
      setLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format d'email invalide");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, pseudo }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Inscription réussie ! Redirection vers la connexion...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.error || "Erreur d'inscription");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-terminal-green rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium mb-2">
            Pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full px-3 py-2 border border-terminal-green rounded bg-terminal-gray text-terminal-green"
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_-]+"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-terminal-green rounded bg-terminal-gray text-terminal-green"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-terminal-green rounded bg-terminal-gray text-terminal-green"
            required
            minLength={8}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-terminal-green rounded bg-terminal-gray text-terminal-green"
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-terminal-green rounded hover:bg-terminal-gray disabled:opacity-50"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-900 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-900 border border-green-500 rounded text-green-200">
          {success}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Déjà un compte ?{" "}
          <a href="/login" className="text-terminal-green hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
} 