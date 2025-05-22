import { menuHandler } from "./routes/menu";
import { orderHandler } from "./routes/order";
import { corsHeaders } from "./utils/cors";

const server = Bun.serve({
	port: 3001,
	async fetch(req) {
		const url = new URL(req.url);

		if (req.method === "OPTIONS") {
			return new Response(null, { headers: corsHeaders });
		}

		if (url.pathname === "/menu" && req.method === "GET") {
			return menuHandler(req);
		}

		if (url.pathname === "/order" && req.method === "POST") {
			return orderHandler(req);
		}

		return new Response("Not Found", { status: 404 });
	},
});

console.log(`Server running at http://localhost:${server.port}`);
