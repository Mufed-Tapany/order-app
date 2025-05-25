import "../style/components.css";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

const Cart = () => {
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
			alert("Order placed successfully!");
		} catch (error) {
			alert(`Failed to place order: ${error.message}`);
		}
	};

	return (
		<div className="centered-site">
			<h2>Your Cart</h2>
			{cart.length !== 0 && (
				<button type="button" className="button-clear" onClick={clearCart}>
					Clean Cart
				</button>
			)}
			{cart.length === 0 ? (
				<p>Cart is empty</p>
			) : (
				<>
					<div>
						{cart.map((item, i) => (
							<p key={item.id}>
								{item.name} x{" "}
								<input
									className="product-qty"
									type="number"
									name="product-qty"
									min="1"
									value={item.quantity}
									onChange={(e) => updateQuantity(i, Number(e.target.value))}
								/>
								— ${(item.price * item.quantity).toFixed(2)}
								<button
									className="remove-button"
									type="button"
									onClick={() => removeFromCart(i)}
								>
									Rmove
								</button>
							</p>
						))}
					</div>
					<p>
						<strong>Total: ${totalPrice.toFixed(2)}</strong>
					</p>
					<input
						className="formInput"
						type="text"
						name="name"
						placeholder="Your name"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className="formInput"
						type="text"
						name="email"
						placeholder="Email address"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit" onClick={handleOrder} className="addButton">
						Place Order
					</button>
				</>
			)}
		</div>
	);
};

export default Cart;
