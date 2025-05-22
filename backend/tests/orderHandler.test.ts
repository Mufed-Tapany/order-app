import { beforeEach, describe, expect, it } from "bun:test";
import { db } from "../db/index";
import { createOrder } from "../db/order.model";

type OrderResponse = {
	success: boolean;
};

type MenuItem = {
	id: number;
	name: string;
	price: number;
};

const API_BASE = "http://localhost:3001";

beforeEach(() => {
	db.run("DELETE FROM orders");
});

describe("createOrder", () => {
	it("inserts a new order", async () => {
		const result = await createOrder("Test User", 1, "Pizza", 2);
		expect(result.changes).toBe(1);
	});
});

describe("POST /order", () => {
	it("should create an order and return 200", async () => {
		const res = await fetch(`${API_BASE}/order`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				customer_name: "Ali Abas",
				items: [{ id: 2, name: "Burger", price: 9, quantity: 1 }],
			}),
		});

		expect(res.status).toBe(200);
		const data = (await res.json()) as OrderResponse;
		expect(data.success).toBe(true);
	});
});

describe("GET /menu", () => {
	it("should get the list of the menu and return 200", async () => {
		const res = await fetch(`${API_BASE}/menu`);

		expect(res.status).toBe(200);
		const data = (await res.json()) as MenuItem[];
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);

		const item = data[0];
		expect(item).toHaveProperty("id");
		expect(item).toHaveProperty("name");
		expect(item).toHaveProperty("price");
	});
});
