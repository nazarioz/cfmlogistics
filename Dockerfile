FROM node:18-alpine AS builder

WORKDIR /app

# Copiar apenas arquivos essenciais para o build
COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

# Etapa 2: Execução
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar apenas os arquivos necessários da etapa anterior
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
