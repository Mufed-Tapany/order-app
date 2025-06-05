import { menuHandler } from './routes/menu';
import { orderHandler } from './routes/order';
import { corsHeaders } from './utils/cors';

const server = Bun.serve({
	port: 3001,

	routes: {
		'*': {
			OPTIONS: () => new Response(null, { headers: corsHeaders }),

			default: () => new Response('Not Found', { status: 404 }),
		},

		'/menu': {
			GET: async () => await menuHandler(),
		},

		'/order': {
			POST: async (request) => await orderHandler(request),
		},
	},
});

console.log(`Server running at http://localhost:${server.port}`);
