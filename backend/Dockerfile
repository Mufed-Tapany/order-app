FROM oven/bun:1.0

WORKDIR /app

# copy package.json and bun.lockb for dependencies
COPY package*.json ./
RUN bun install

# copy your compiled dist folder and database file
COPY dist ./dist
COPY restaurant.db ./

CMD ["bun", "run", "dist/bundle.js"]