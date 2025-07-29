import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../../../src/lib/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const gameId = url.searchParams.get('gameId');
    const mode = url.searchParams.get('mode') || 'blind';
    
    if (gameId) {
      // Récupérer le leaderboard pour un jeu et mode spécifiques
      const leaderboard = await prisma.score.findMany({
        where: { 
          gameId: parseInt(gameId),
          gameMode: mode
        },
        include: {
          user: {
            select: {
              username: true
            }
          }
        },
        orderBy: {
          streak: 'desc'
        },
        take: 10
      });

      // Récupérer le score de l'utilisateur connecté pour ce jeu et mode
      let userScore = null;
      try {
        const authResult = requireAuth(request);
        if (authResult.authenticated) {
          userScore = await prisma.score.findFirst({
            where: {
              userId: authResult.user.id,
              gameId: parseInt(gameId),
              gameMode: mode
            }
          });
        }
      } catch (error) {
        // Utilisateur non connecté, pas de problème
      }

      return new Response(JSON.stringify({
        leaderboard: leaderboard,
        userScore: userScore
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Récupérer tous les scores de l'utilisateur connecté
    const authResult = requireAuth(request);
    
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const scores = await prisma.score.findMany({
      where: { userId: authResult.user.id },
      include: {
        game: {
          select: {
            name: true,
            title: true
          }
        }
      }
    });

    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error retrieving scores:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const authResult = requireAuth(request);
    
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { gameId, streak, gameMode = 'blind' } = await request.json();

    if (!gameId || streak === undefined) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Chercher un score existant pour ce jeu, utilisateur et mode
    const existingScore = await prisma.score.findFirst({
      where: {
        userId: authResult.user.id,
        gameId: parseInt(gameId),
        gameMode: gameMode
      }
    });

    let updatedScore;
    if (existingScore) {
      // Mettre à jour le score existant
      updatedScore = await prisma.score.update({
        where: { id: existingScore.id },
        data: {
          streak: Math.max(existingScore.streak, streak),
          totalQuestions: existingScore.totalQuestions + 1,
          // Mettre à jour les autres champs si nécessaire
          score: Math.max(existingScore.score || 0, streak),
          maxScore: Math.max(existingScore.maxScore || 0, streak)
        }
      });
    } else {
      // Créer un nouveau score
      updatedScore = await prisma.score.create({
        data: {
          userId: authResult.user.id,
          gameId: parseInt(gameId),
          streak: streak,
          totalQuestions: 1,
          gameMode: gameMode,
          score: streak,
          maxScore: streak
        }
      });
    }

    return new Response(JSON.stringify(updatedScore), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error saving score:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 