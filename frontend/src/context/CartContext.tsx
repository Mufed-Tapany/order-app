import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { CartContextType, CartItem, CartProviderProps } from '../../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const addToCart = useCallback((item: CartItem) => {
		setCart((prev) => {
			const updated = prev.map((prevItem) =>
				prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
			);
			const exists = prev.some((prevItem) => prevItem.id === item.id);
			return exists ? updated : [...prev, { ...item, quantity: 1 }];
		});
	}, []);

	const removeFromCart = useCallback((itemId: number) => {
		setCart((prev) => {
			const updated = prev.filter((prevItem) => prevItem.id !== itemId);
			return updated;
		});
	}, []);

	const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
		setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
	}, []);

	const clearCart = useCallback(() => {
		setCart([]);
	}, []);

	const value = useMemo(
		() => ({
			cart,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			name,
			setName,
			email,
			setEmail,
		}),
		[cart, addToCart, removeFromCart, updateQuantity, clearCart, name, email]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
