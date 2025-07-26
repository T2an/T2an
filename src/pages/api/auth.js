import { requireAuth } from '../../../src/lib/jwt.js';
import dotenv from 'dotenv';

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
    console.error('Authentication verification error:', error);
    return new Response(JSON.stringify({ 
      authenticated: false,
      user: null,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 