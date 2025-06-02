import RatinngStars from "./RatingStars";
import "../style/components.css";
import type { DialogProps } from "../../types";

const Dialog = ({ onClose, onSubmitRating }: DialogProps) => {
	return (
		<div>
			<h3>Thanks for submiting your order</h3>
			<p>Would you like to rate your order expierence wiht us ?</p>
			<RatinngStars />
			<button className="submit-order-btn" type="submit" onClick={onClose}>
				Submit Rating
			</button>
			<button className="skip-btn" type="button" onClick={onSubmitRating}>
				Skip
			</button>
		</div>
	);
};

export default Dialog;
