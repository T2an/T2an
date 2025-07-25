import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis .env
dotenv.config();

// Clé secrète pour signer les JWT (doit être définie dans les variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Durée de vie du token (7 jours)
const JWT_EXPIRES_IN = '7d';

// Générer un token JWT
export function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    pseudo: user.pseudo,
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Vérifier et décoder un token JWT
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Extraire le token depuis les headers ou cookies
export function extractToken(request) {
  // Essayer d'abord depuis les headers Authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Essayer depuis les cookies
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    return cookies.token;
  }

  return null;
}

// Middleware pour vérifier l'authentification
export function requireAuth(request) {
  const token = extractToken(request);
  
  if (!token) {
    return { authenticated: false, user: null };
  }

  const result = verifyToken(token);
  
  if (!result.valid) {
    return { authenticated: false, user: null };
  }

  return { 
    authenticated: true, 
    user: {
      id: result.payload.userId,
      email: result.payload.email,
      pseudo: result.payload.pseudo
    }
  };
} 