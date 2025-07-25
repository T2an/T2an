import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Charger les variables d'environnement
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

export async function POST({ request }) {
  try {
    const { email, password, pseudo } = await request.json();

    // Validation basique
    if (!email || !password || !pseudo) {
      return new Response(JSON.stringify({ error: 'Email, pseudo et mot de passe requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Format d\'email invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validation mot de passe
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'Le mot de passe doit contenir au moins 8 caractères' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validation pseudo
    if (pseudo.length < 3 || pseudo.length > 20) {
      return new Response(JSON.stringify({ error: 'Le pseudo doit faire entre 3 et 20 caractères' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(pseudo)) {
      return new Response(JSON.stringify({ error: 'Le pseudo ne peut contenir que des lettres, chiffres, tirets ou underscores' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Vérifier si l'utilisateur existe déjà (email ou pseudo)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { pseudo }
        ]
      }
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Un utilisateur avec cet email ou ce pseudo existe déjà' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        pseudo,
        password: hashedPassword
      }
    });

    return new Response(JSON.stringify({ 
      message: 'Utilisateur créé avec succès',
      userId: user.id 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 