import { createOrder } from "../db/order.model";
import { corsHeaders } from "../utils/cors";

type OrderItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

type OrderRequest = {
	customer_name: string;
	customer_email: string;
	items: OrderItem[];
};

const badRequest = (message: string) =>
	new Response(message, {
		status: 400,
		headers: corsHeaders,
	});

export const orderHandler = async (req: Request): Promise<Response> => {
	try {
		const body = (await req.json()) as OrderRequest;

		if (
			!body.customer_name ||
			!body.customer_email ||
			!Array.isArray(body.items)
		) {
			return badRequest("Missing data");
		}

		for (const item of body.items) {
			if (!item.id || !item.name || !item.quantity) {
				return badRequest("Invalid item data");
			}

			createOrder(
				body.customer_name,
				body.customer_email,
				item.id,
				item.name,
				item.quantity,
			);
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error("Error in orderHandler:", error);
		return badRequest("Bad request");
	}
};
