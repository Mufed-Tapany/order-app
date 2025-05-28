# Build frontend and backend first
echo "Building frontend..."
cd frontend && npm install && npm run build && cd ..

echo "Bundling backend..."
cd backend && bun install &&
bun build server.ts --target=bun --outfile dist/bundle.js && cd ..

# Build and start Docker containers
echo "Building Docker images and starting containers..."
export COMPOSE_BAKE=true

docker compose -f docker-compose.prod.yml build
docker compose -p order-app-prod -f docker-compose.prod.yml up -d

echo "All done! Frontend at http://localhost:3000, Backend at http://localhost:3001"
