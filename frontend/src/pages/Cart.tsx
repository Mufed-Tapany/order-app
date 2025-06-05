import '../style/components.css';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OrderData } from '../../types';
import Dialog from '../components/Dialog';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';

const Cart = () => {
	const [showRating, setShowRating] = useState<boolean>(false);
	const navigate = useNavigate();
	const { cart, removeFromCart, updateQuantity, clearCart, name, setName, email, setEmail } = useCart();

	const totalPrice = useMemo(() => {
		return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}, [cart]);

	const handleOrder = useCallback(
		async (data: OrderData) => {
			try {
				await placeOrder(data.cart, data.name, data.email);
				clearCart();
				setShowRating(true);
			} catch (error) {
				alert(alert(`Failed to place order: ${error.message}`));
			}
		},
		[clearCart]
	);

	const onCartSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget as HTMLFormElement);

			const name = formData.get('name')?.toString() || '';
			const email = formData.get('email')?.toString() || '';

			const data: OrderData = {
				name,
				email,
				cart,
			};

			for (const [key, value] of formData.entries()) {
				data[key] = value;
			}

			data.cart = cart;
			await handleOrder(data);
		},
		[cart, handleOrder]
	);

	const onCloseRatingDialog = useCallback(() => {
		setShowRating(false);
	}, []);

	const formId = 'cart-form';

	return (
		<div className="cart-container">
			{!showRating ? (
				<div>
					<h2 className="cart-title">Your Cart</h2>
					{cart.length > 0 && (
						<button type="button" className="cart-clear-btn" onClick={clearCart}>
							Clear Cart
						</button>
					)}

					{cart.length === 0 ? (
						<div className="cart-empty">
							<p>Your cart is empty.</p>
							<button
								className="submit-order-btn"
								type="button"
								style={{ marginTop: '30px' }}
								onClick={() => navigate('/')}
							>
								Back to menu
							</button>
						</div>
					) : (
						<form id={formId} onSubmit={onCartSubmit}>
							<ul className="cart-items">
								{cart.map((item) => (
									<li key={item.id} className="cart-item">
										<div className="item-info">
											<h4>{item.name}</h4>
											<p>${item.price.toFixed(2)} each</p>
										</div>
										<div className="item-actions">
											<input
												className="item-qty"
												name="quantity"
												type="number"
												form={formId}
												min="1"
												value={item.quantity}
												onChange={(e) => updateQuantity(item.id, e.target.valueAsNumber)}
											/>
											<p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
											<button type="button" className="item-remove-btn" onClick={() => removeFromCart(item.id)}>
												Remove
											</button>
										</div>
									</li>
								))}
							</ul>

							<p className="cart-total">
								<strong>Total: ${totalPrice.toFixed(2)}</strong>
							</p>

							<section className="order-form">
								<h3>Complete Your Order</h3>
								<input
									className="form-input"
									type="text"
									name="name"
									placeholder="Your name"
									value={name}
									defaultValue={''}
									onChange={(e) => setName(e.target.value)}
									form={formId}
									required
								/>
								<input
									className="form-input"
									type="email"
									name="email"
									placeholder="Email address"
									value={email}
									defaultValue={''}
									onChange={(e) => setEmail(e.target.value)}
									form={formId}
									required
								/>
								<button type="submit" className="submit-order-btn">
									Place Order
								</button>
							</section>
						</form>
					)}
				</div>
			) : (
				<Dialog onClose={onCloseRatingDialog} onSubmitRating={onCloseRatingDialog} />
			)}
		</div>
	);
};

export default Cart;
