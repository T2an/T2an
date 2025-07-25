import { requireAuth } from '../../../src/lib/jwt.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export async function GET({ request }) {
  try {
    const authResult = requireAuth(request);

    if (authResult.authenticated) {
      return new Response(JSON.stringify({
        authenticated: true,
        user: authResult.user
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        authenticated: false,
        user: null
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Erreur lors de la vérification d\'authentification:', error);
    return new Response(JSON.stringify({ 
      authenticated: false,
      user: null,
      error: 'Erreur interne du serveur'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 