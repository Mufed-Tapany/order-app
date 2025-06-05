import RatinngStars from './RatingStars';
import '../style/components.css';
import React from 'react';
import type { DialogProps } from '../../types';

const Dialog = React.memo(({ onClose, onSubmitRating }: DialogProps) => {
	return (
		<div>
			<h3>Thanks for submitting your order</h3>
			<p>Would you like to rate your order experience with us ?</p>
			<RatinngStars />
			<button className="submit-order-btn" type="submit" onClick={onClose}>
				Submit Rating
			</button>
			<button className="skip-btn" type="button" onClick={onSubmitRating}>
				Skip
			</button>
		</div>
	);
});

export default Dialog;
