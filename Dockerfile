# ─── Stage 1: Install & Build ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9

# Copy workspace manifests first for better layer caching
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy library packages (api-client-react, api-spec, api-zod)
COPY lib/ ./lib/

# Copy the frontend app
COPY artifacts/prime-wave/ ./artifacts/prime-wave/

# Install all dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts

# Generate API client from OpenAPI spec
RUN pnpm --filter @workspace/api-spec codegen || true

# Build TypeScript library types
RUN pnpm run typecheck:libs || true

# Build the production Vite bundle with the real API URL
ENV NODE_ENV=production
ENV VITE_API_URL=https://api.meetkishore.in/api/v1

RUN pnpm --filter @workspace/prime-wave build

# ─── Stage 2: Minimal production runner ───────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the built static files and the server script
COPY --from=builder /app/artifacts/prime-wave/dist ./dist
COPY --from=builder /app/artifacts/prime-wave/serve.mjs ./serve.mjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "serve.mjs"]
