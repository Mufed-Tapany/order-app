# Build frontend and backend first
echo "Building frontend..."
cd frontend && npm install && cd ..

echo "Bundling backend..."
cd backend && bun install && cd ..

# Build and start Docker containers
echo "Building Docker images and starting containers..."
export COMPOSE_BAKE=true

docker compose -f docker-compose.dev.yml build
docker compose -p order-app-dev -f docker-compose.dev.yml --profile dev up -d

echo "All done! Frontend at http://localhost:3002, Backend at http://localhost:3003"
