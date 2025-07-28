import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET({ params, request }) {
  try {
    const { gameName } = params;
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') || 'blind';
    
    const game = await prisma.game.findUnique({
      where: {
        name: gameName
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            answer: true,
            type: true,
            difficulty: true,
            metadata: true,
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

    let questions = game.questions;

    // Pour le mode normal, générer des questions à choix multiples
    if (mode === 'normal') {
      questions = await generateMultipleChoiceQuestions(game.questions);
    }

    return new Response(JSON.stringify({
      id: game.id,
      name: game.name,
      title: game.title,
      description: game.description,
      mode: mode,
      questions: questions
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du jeu:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function generateMultipleChoiceQuestions(questions) {
  const allAnswers = questions.map(q => q.answer);
  
  return questions.map(question => {
    // Créer 4 propositions : 1 bonne + 3 mauvaises
    const correctAnswer = question.answer;
    let wrongAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    
    // Mélanger et prendre 3 réponses aléatoires
    wrongAnswers = shuffleArray(wrongAnswers).slice(0, 3);
    
    // Créer les 4 propositions et les mélanger
    const choices = shuffleArray([correctAnswer, ...wrongAnswers]);
    
    return {
      ...question,
      choices: choices,
      correctChoiceIndex: choices.indexOf(correctAnswer)
    };
  });
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 