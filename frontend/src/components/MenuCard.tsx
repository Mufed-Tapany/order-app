import type { MenuCardProps } from '../../types';
import '../style/components.css';

const MenuCard = ({ item, addToCart }: MenuCardProps) => {
	return (
		<div className="menu-card">
			{item.image && <img src={item.image} alt={item.name} className="menu-card-image" loading="lazy" />}

			<div className="menu-card-content">
				<h3 className="menu-card-title">{item.name}</h3>

				<p className="menu-card-description">
					Delicious and freshly made {item.name.toLowerCase()} that will satisfy your cravings!
				</p>

				{item.rating !== undefined && <p className="menu-card-rating">⭐ {item.rating}</p>}

				<p className="menu-card-price">${item.price.toFixed(2)}</p>

				<button type="submit" onClick={() => addToCart(item)} className="add-btn">
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default MenuCard;
