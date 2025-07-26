import React, { useState, useEffect } from "react";

export default function ProtectedRoute({ children, fallback = null }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Authentication verification error:", error);
      setUser(null);
      setAuthenticated(false);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return fallback || <div className="text-center p-8">Verifying authentication...</div>;
  }

  if (!authenticated) {
    return fallback || <div className="text-center p-8">Redirecting to login page...</div>;
  }

  return children;
} 