# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copie du reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

# Production stage
FROM node:20-alpine

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S astro -u 1001

WORKDIR /app

# Copie des fichiers de dépendances de production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copie des fichiers buildés
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/prisma/ ./prisma/

# Générer le client Prisma
RUN npx prisma generate

# Changer les permissions
RUN chown -R astro:nodejs /app
USER astro

EXPOSE 4321

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4321/api/auth', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/server/entry.mjs"] 