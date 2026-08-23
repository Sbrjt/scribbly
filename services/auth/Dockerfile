FROM node:lts-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./ 
COPY packages/common/package.json ./packages/common/
COPY services/auth/package.json ./services/auth/

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store \
    pnpm config set store-dir /app/.pnpm-store && \
    pnpm install 

# HEALTHCHECK CMD wget -q -O /dev/null http://127.0.0.1:${AUTH_SERVICE_PORT}/health 

CMD ["pnpm", "-F", "auth", "dev"]
