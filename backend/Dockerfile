FROM oven/bun:1.0

WORKDIR /app
COPY ./backend/package*.json ./
RUN bun install

COPY ./backend/dist ./dist
COPY ./backend/restaurant.db ./restaurant.db

CMD ["bun", "run", "dist/bundle.js"]
