import type { MenuCardProps } from '../../types';
import '../style/components.css';

const MenuCard = ({ item, addToCart }: MenuCardProps) => {
	return (
		<div className="menuCard">
			<h3>{item.name}</h3>
			<p>${item.price}</p>
			<button type="submit" onClick={() => addToCart(item)} className="addButton">
				Add to Cart
			</button>
		</div>
	);
};

export default MenuCard;
