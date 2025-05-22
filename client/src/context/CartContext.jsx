import { createContext, useContext, useState } from "react";
import { placeOrder } from "../services/api";

const CartContext = createContext();

export const useCart = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const addToCart = (item) => {
		setCart((prev) => {
			const updated = prev.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
			);
			const exists = prev.some((i) => i.id === item.id);
			return exists ? updated : [...prev, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (index) => {
		const updatedCart = [...cart];
		updatedCart.splice(index, 1);
		setCart(updatedCart);
	};

	const updateQuantity = (index, newQuantity) => {
		setCart((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, quantity: newQuantity } : item,
			),
		);
	};

	// const handleNameInputChange = (value) => {
	// 	setNameInput(value);
	// };

	// const handleEmailInputChange = (value) => {
	// 	setEmailInput(value);
	// };

	const clearCart = () => setCart([]);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				name,
				setName,
				email,
				setEmail,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
