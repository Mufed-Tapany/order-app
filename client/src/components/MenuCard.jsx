import "../style/components.css";

const MenuCard = ({ item, onClick }) => {
	return (
		<div className="menuCard">
			<h3>{item.name}</h3>
			<p>${item.price}</p>
			<button type="submit" onClick={() => onClick(item)} className="addButton">
				Add to Card
			</button>
		</div>
	);
};

export default MenuCard;
