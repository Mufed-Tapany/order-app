import { db } from './index';

// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
db.run(`DROP TABLE IF EXISTS menu`);

db.run(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
		rating REAL DEFAULT NULL,
    image TEXT DEFAULT NULL
  )
`);

const count = db.query('SELECT COUNT(*) as count FROM menu').get() as {
	count: number;
};

if (count.count === 0) {
	const insert = db.prepare('INSERT INTO menu (name, price, rating, image) VALUES (?, ?, ?, ?)');
	insert.run('Pizza', 12.5, 4.5, '/images/pizza.jpg');
	insert.run('Burger', 9.0, 4.0, '/images/burger.jpg');
	insert.run('Sushi', 14.5, 4.8, '/images/sushi.jpg');
	insert.run('Döner', 8.0, 3.9, '/images/doener.jpg');
	insert.run('Falafel', 7, 4.5, '/images/falafel.jpg');
	insert.run('Salad', 6.5, 3.2, '/images/salad.jpg');
	insert.run('Lasanga', 15, 4.0, '/images/lasanga.jpg');
	insert.run('Pasta', 13, 3.5, '/images/pasta.png');
}

export const getAllMenuItems = () => db.query('SELECT * FROM menu').all();
