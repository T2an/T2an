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

    const { gameId, score, streak, totalQuestions } = await request.json();

    if (!gameId || score === undefined || streak === undefined || totalQuestions === undefined) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
      updatedScore = await prisma.score.update({
        where: { id: existingScore.id },
        data: {
          score: score,
          maxScore: Math.max(existingScore.maxScore, score),
          streak: Math.max(existingScore.streak, streak),
          totalQuestions: existingScore.totalQuestions + totalQuestions
        }
      });
    } else {
      updatedScore = await prisma.score.create({
        data: {
          userId: authResult.user.id,
          gameId: parseInt(gameId),
          score: score,
          maxScore: score,
          streak: streak,
          totalQuestions: totalQuestions
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