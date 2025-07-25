import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Connexion réussie ! Redirection...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError(data.error || "Erreur de connexion");
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
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-terminal-green rounded hover:bg-terminal-gray disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
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
          Pas encore de compte ?{" "}
          <a href="/register" className="text-terminal-green hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
} 