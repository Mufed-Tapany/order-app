import './style/components.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Cart from './pages/Cart';
import Main from './pages/Main';

function App() {
	const { cart } = useCart();

	return (
		<div>
			<nav>
				<div className="nav-left">
					<img src="/images/logo.png" alt="logo" />
				</div>

				<div className="nav-right">
					<Link to="/">Menu</Link>
					<Link to="/cart">Cart ({cart.length})</Link>
				</div>
			</nav>

			{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
			<div className="divider"></div>

			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	);
}

export default App;
