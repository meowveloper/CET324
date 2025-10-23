FROM oven/bun:debian

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]

