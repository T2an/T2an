import React, { useState, useEffect } from "react";

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {}
  }

  if (loading) {
    return <span className="text-gray-400 ml-4">Loading...</span>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4 ml-4">
        <a href="/profile" className="hover:text-terminal-green transition-colors">Profile</a>
        <button
          onClick={handleLogout}
          className="hover:text-terminal-green transition-colors border border-terminal-green rounded px-3 py-1 ml-2"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <a href="/login" className="hover:text-terminal-green transition-colors ml-4">
      Sign in
    </a>
  );
} 