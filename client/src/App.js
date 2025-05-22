import { Link, Route, Routes } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Cart from "./pages/Cart";
import Main from "./pages/Main";
import "./App.css"

const App = () => {
	const { cart } = useCart();
	return (
		<div>
			<nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
				<Link to="/">Menu</Link>
				<Link to="/cart">Cart ({cart.length})</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	);
};

export default App;
