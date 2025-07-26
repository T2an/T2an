# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm ci --only=production

# Copy remaining files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S astro -u 1001

WORKDIR /app

# Copy production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built files
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/prisma/ ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Change permissions
RUN chown -R astro:nodejs /app
USER astro

EXPOSE 4321

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4321/api/auth', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/server/entry.mjs"] 