FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 hono
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:hono /app/dist ./dist
COPY --from=builder --chown=hono:hono /app/node_modules ./node_modules
COPY --from=builder --chown=hono:hono /app/package.json ./package.json

USER hono

EXPOSE 3301

CMD ["npm", "start"]