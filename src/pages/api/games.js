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
    const authResult = requireAuth(request);
    
    // Récupérer tous les jeux actifs
    const games = await prisma.game.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    // Si l'utilisateur est connecté, récupérer ses scores
    let userScores = {};
    if (authResult.authenticated) {
      const scores = await prisma.score.findMany({
        where: { userId: authResult.user.id },
        include: { game: true }
      });
      
      scores.forEach(score => {
        userScores[score.game.name] = {
          maxScore: score.maxScore,
          streak: score.streak,
          totalQuestions: score.totalQuestions
        };
      });
    }

    // Combiner les jeux avec les scores
    const gamesWithScores = games.map(game => ({
      id: game.id,
      name: game.name,
      title: game.title,
      description: game.description,
      questionCount: game._count.questions,
      userScore: userScores[game.name] || null
    }));

    return new Response(JSON.stringify(gamesWithScores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des jeux:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 