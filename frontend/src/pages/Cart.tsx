import "../style/components.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

const Cart = () => {
	const [showRating, setShowRating] = useState(false);
	const navigate = useNavigate();
	const {
		cart,
		removeFromCart,
		updateQuantity,
		clearCart,
		name,
		setName,
		email,
		setEmail,
	} = useCart();

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleOrder = async () => {
		try {
			await placeOrder(cart, name, email);
			clearCart();
			setShowRating(true);
		} catch (error) {
			alert(`Failed to place order: ${error.message}`);
		}
	};

	const onCloseRatingDialog = () => {
		setShowRating(false);
	};

	const onSubmitRatingDialog = () => {
		setShowRating(false);
	};

	return (
		<div className="cart-container">
			{!showRating && (
				<div>
					<h2 className="cart-title">Your Cart</h2>
					{cart.length > 0 && (
						<button
							type="button"
							className="cart-clear-btn"
							onClick={clearCart}
						>
							Clear Cart
						</button>
					)}

					{cart.length === 0 && !showRating ? (
						<div className="cart-empty">
							<p>Your cart is empty.</p>
							<button
								className="submit-order-btn"
								type="button"
								style={{ marginTop: "30px" }}
								onClick={() => navigate("/")}
							>
								Back to menu
							</button>
						</div>
					) : (
						<>
							<ul className="cart-items">
								{cart.map((item, i) => (
									<li key={item.id} className="cart-item">
										<div className="item-info">
											<h4>{item.name}</h4>
											<p>${item.price.toFixed(2)} each</p>
										</div>
										<div className="item-actions">
											<input
												className="item-qty"
												type="number"
												min="1"
												value={item.quantity}
												onChange={(e) =>
													updateQuantity(i, Number(e.target.value))
												}
											/>
											<p className="item-total">
												${(item.price * item.quantity).toFixed(2)}
											</p>
											<button
												type="button"
												className="item-remove-btn"
												onClick={() => removeFromCart(i)}
											>
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
									onChange={(e) => setName(e.target.value)}
								/>
								<input
									className="form-input"
									type="email"
									name="email"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<button
									type="submit"
									className="submit-order-btn"
									onClick={handleOrder}
								>
									Place Order
								</button>
							</section>
						</>
					)}
				</div>
			)}
			{showRating && (
				<Dialog
					onClose={onCloseRatingDialog}
					onSubmitRating={onSubmitRatingDialog}
				/>
			)}
		</div>
	);
};

export default Cart;
