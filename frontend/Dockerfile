# Base stage for dependencies
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Runner stage
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
ENV PORT=3100
ENV NODE_ENV=production
EXPOSE 3100
CMD ["npm", "run", "start"]
