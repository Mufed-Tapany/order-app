import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { fetchMenu } from "../services/api";
import "../style/components.css";
import type { CartItem } from "../../types";
import { useCart } from "../context/CartContext";

const Main = () => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [error, setError] = useState<string>("");
	const { addToCart } = useCart();
	useEffect(() => {
		fetchMenu()
			.then(setItems)
			.catch((error: Error) => setError(error.message));
	}, []);

	if (error) return <p>{error}</p>;

	return (
		<div className="centered-site">
			<h1>Menu</h1>
			<div className="menuList">
				{items.map((item: CartItem) => (
					<MenuCard key={item.id} item={item} addToCart={addToCart} />
				))}
			</div>
		</div>
	);
};

export default Main;
