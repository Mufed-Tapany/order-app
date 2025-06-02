import { getAllMenuItems } from "../db/menu.model";
import { corsHeaders } from "../utils/cors";

export const menuHandler = async (request: Request): Promise<Response> => {
	const items = getAllMenuItems();
	return Response.json(items, { headers: corsHeaders });
};
