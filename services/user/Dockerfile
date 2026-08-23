FROM node:lts-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY packages/common/package.json ./packages/common/
COPY services/user/package.json ./services/user/

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store \
    pnpm config set store-dir /app/.pnpm-store && \
    pnpm install 

CMD ["pnpm", "-F", "user", "dev"]
