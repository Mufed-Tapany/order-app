import { db } from './index';

// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
db.run(`DROP TABLE IF EXISTS menu`);

db.run(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`);

const count = db.query('SELECT COUNT(*) as count FROM menu').get() as {
	count: number;
};

if (count.count === 0) {
	const insert = db.prepare('INSERT INTO menu (name, price) VALUES (?, ?)');
	insert.run('Pizza', 12.5);
	insert.run('Burger', 9.0);
	insert.run('Sushi', 14.5);
	insert.run('Döner', 8.0);
}

export const getAllMenuItems = () => db.query('SELECT * FROM menu').all();
