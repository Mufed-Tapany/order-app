import type { ReactNode } from 'react';

export interface CartItem {
	rating?: undefined;
	image?: string;
	id: number;
	name: string;
	price: number;
	quantity: number;
}

export interface CartContextType {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (index: number) => void;
	updateQuantity: (index: number, newQuantity: number) => void;
	clearCart: () => void;
	name: string;
	setName: (name: string) => void;
	email: string;
	setEmail: (email: string) => void;
}

export interface DialogProps {
	onClose: () => void;
	onSubmitRating: () => void;
}

export interface MenuCardProps {
	item: CartItem;
	addToCart: (item: CartItem) => void;
}

export interface OrderData {
	name: string;
	email: string;
	cart: CartItem[];
}

export interface CartProviderProps {
	children: ReactNode;
}
