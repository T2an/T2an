import { PrismaClient } from '@prisma/client';
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

export async function GET({ request, params }) {
  try {
    const { gameName } = params;

    // Récupérer le jeu
    const game = await prisma.game.findUnique({
      where: { name: gameName },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            answer: true,
            type: true,
            difficulty: true,
            metadata: true
          }
        }
      }
    });

    if (!game) {
      return new Response(JSON.stringify({ error: 'Jeu non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!game.isActive) {
      return new Response(JSON.stringify({ error: 'Jeu non disponible' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      id: game.id,
      name: game.name,
      title: game.title,
      description: game.description,
      questions: game.questions
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du jeu:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 