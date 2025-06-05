import { menuHandler } from './routes/menu';
import { orderHandler } from './routes/order';
import { corsHeaders } from './utils/cors';

const server = Bun.serve({
	port: 3001,

	fetch: async (request: Request) => {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (url.pathname === '/menu' && request.method === 'GET') {
			return await menuHandler();
		}

		if (url.pathname === '/order' && request.method === 'POST') {
			return await orderHandler(request);
		}

		return new Response('Not Found', { status: 404 });
	},
});

console.log(`Server running at http://localhost:${server.port}`);
