FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/frontend ./apps/frontend
COPY turbo ./turbo
COPY tsconfig.json ./
COPY .turbo .turbo
COPY .env .env

RUN npm ci
RUN npx turbo run build --filter=apps/frontend...

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
