import { getAllMenuItems } from '../db/menu.model';
import { corsHeaders } from '../utils/cors';

export const menuHandler = async (): Promise<Response> => {
	const items = getAllMenuItems();
	return Response.json(items, { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
};
