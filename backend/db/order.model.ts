import { db } from "./index";

// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
db.run(`DROP TABLE IF EXISTS orders`);

db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    item_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES menu(id)
  )
`);

export const createOrder = (
	customerName: string,
	customerEmail: string,
	itemId: number,
	itemName: string,
	quantity: number,
) =>
	db.run(
		"INSERT INTO orders (customer_name, customer_email, item_id, item_name, quantity) VALUES (?, ?, ?, ?, ?)",
		[customerName, customerEmail, itemId, itemName, quantity],
	);
