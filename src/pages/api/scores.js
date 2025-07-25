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

// Récupérer les scores d'un utilisateur
export async function GET({ request }) {
  try {
    const authResult = requireAuth(request);
    
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Authentification requise' }), {
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
    console.error('Erreur lors de la récupération des scores:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Sauvegarder un score (appelé à chaque Game Over)
export async function POST({ request }) {
  try {
    const authResult = requireAuth(request);
    
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Authentification requise' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { gameId, score, streak, totalQuestions } = await request.json();

    if (!gameId || score === undefined || streak === undefined || totalQuestions === undefined) {
      return new Response(JSON.stringify({ error: 'Données manquantes' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Vérifier si un score existe déjà pour cet utilisateur et ce jeu
    const existingScore = await prisma.score.findUnique({
      where: {
        userId_gameId: {
          userId: authResult.user.id,
          gameId: parseInt(gameId)
        }
      }
    });

    let updatedScore;
    if (existingScore) {
      // Mettre à jour le score existant
      updatedScore = await prisma.score.update({
        where: { id: existingScore.id },
        data: {
          score: score, // Score actuel (série terminée)
          maxScore: Math.max(existingScore.maxScore, score), // Meilleur score historique
          streak: Math.max(existingScore.streak, streak), // Meilleure série historique
          totalQuestions: existingScore.totalQuestions + totalQuestions // Nombre de parties jouées
        }
      });
    } else {
      // Créer un nouveau score
      updatedScore = await prisma.score.create({
        data: {
          userId: authResult.user.id,
          gameId: parseInt(gameId),
          score: score, // Score actuel
          maxScore: score, // Meilleur score historique
          streak: streak, // Meilleure série historique
          totalQuestions: totalQuestions // Nombre de parties jouées
        }
      });
    }

    return new Response(JSON.stringify(updatedScore), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 