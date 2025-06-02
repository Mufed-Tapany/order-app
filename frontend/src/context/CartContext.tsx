// src/context/CartContext.tsx
import { type ReactNode, createContext, useContext, useState } from "react";
import type { CartContextType, CartItem } from "../../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const addToCart = (item: CartItem) => {
		setCart((prev) => {
			const updated = prev.map((prevItem) =>
				prevItem.id === item.id
					? { ...prevItem, quantity: prevItem.quantity + 1 }
					: prevItem,
			);
			const exists = prev.some((prevItem) => prevItem.id === item.id);
			return exists ? updated : [...prev, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (index: number) => {
		const updatedCart = [...cart];
		updatedCart.splice(index, 1);
		setCart(updatedCart);
	};

	const updateQuantity = (index: number, newQuantity: number) => {
		setCart((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, quantity: newQuantity } : item,
			),
		);
	};

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
