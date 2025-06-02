import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { fetchMenu } from "../services/api";
import "../style/components.css";
import type { CartItem } from "../../types";
import { useCart } from "../context/CartContext";

const Main = () => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState("");
	const { addToCart } = useCart();
	useEffect(() => {
		fetchMenu()
			.then(setItems)
			.catch((err) => setError(err.message));
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
