# ─── Stage 1: Install & Build ─────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9

# Copy workspace config files
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

# ─── Stage 2: nginx to serve the SPA ─────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our SPA-aware nginx config
COPY --from=builder /app/artifacts/prime-wave/dist/public /usr/share/nginx/html

# Write nginx config inline — serves index.html for all routes (SPA fix)
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # SPA fallback: all unknown paths serve index.html\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache static assets\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;\n\
}\n' > /etc/nginx/conf.d/app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
