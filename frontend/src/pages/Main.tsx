import { useEffect, useMemo, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { fetchMenu } from '../services/api';
import '../style/components.css';
import type { CartItem } from '../../types';
import { useCart } from '../context/CartContext';

const Main = () => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [error, setError] = useState<string>();
	const [priceFilter, setPriceFilter] = useState<number>(20);
	const [searchTerm, setSearchTerm] = useState('');

	const { addToCart } = useCart();

	useEffect(() => {
		fetchMenu()
			.then(setItems)
			.catch((error: Error) => setError(error.message));
	}, []);

	const filteredItems = useMemo(() => {
		return items.filter(
			(item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.price <= priceFilter
		);
	}, [items, searchTerm, priceFilter]);

	if (error) return <p>{error}</p>;

	return (
		<div>
			<h1 className="centered-site">Menu</h1>
			<div className="main-actions">
				<label>
					Search item:
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{ marginLeft: '8px', padding: '4px' }}
					/>
				</label>
				<label>
					Max Price $:
					<input
						type="number"
						value={priceFilter}
						onChange={(e) => setPriceFilter(e.target.valueAsNumber || 0)}
						style={{ marginLeft: '8px', padding: '4px' }}
					/>
				</label>
			</div>
			<div className="menu-list">
				{filteredItems.map((item: CartItem) => (
					<MenuCard key={item.id} item={item} addToCart={addToCart} />
				))}
			</div>
		</div>
	);
};

export default Main;
