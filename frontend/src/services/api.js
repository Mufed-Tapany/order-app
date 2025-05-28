const API_BASE = import.meta.env.VITE_API_URL_DEV;

export const fetchMenu = async () => {
	const response = await fetch(`${API_BASE}/menu`);
	if (!response.ok) throw new Error("Failed to fetch menu");
	return response.json();
};

export const placeOrder = async (cartItems, customerName, customerEmail) => {
	const response = await fetch(`${API_BASE}/order`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			customer_name: customerName,
			customer_email: customerEmail,
			items: cartItems,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to place order");
	}

	return response.json();
};
