import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { CartProvider } from "./context/CartContext.js";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<BrowserRouter>
		<CartProvider>
			<App />
		</CartProvider>
	</BrowserRouter>,
);
