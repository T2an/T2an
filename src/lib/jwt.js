import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_EXPIRES_IN = '7d';

export function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    username: user.username,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

export function extractToken(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

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
      username: result.payload.username
    }
  };
} 