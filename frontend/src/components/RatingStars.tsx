import { useCallback, useState } from "react";
import "../style/components.css";

const RatinngStars = ({ max = 5, min = 0 }) => {
	const [selected, setSeletced] = useState<number>(min);
	const [hoverd, setHovered] = useState<number>(0);

	const stars = [...Array(max)].map((_, i: number) => {
		const index = i + 1;
		const isFilled = hoverd ? index <= hoverd : index <= selected;
		return { index, isFilled };
	});

	const handleSelected = useCallback((i: number) => {
		setSeletced(i);
	}, []);

	const handleHovered = useCallback((i: number) => {
		setHovered(i);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHovered(0);
	}, []);

	return (
		<div onMouseLeave={handleMouseLeave}>
			{stars.map(({ index, isFilled }) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					key={index}
					onClick={() => handleSelected(index)}
					onMouseEnter={() => handleHovered(index)}
					xmlns="http://www.w3.org/2000/svg"
					fill={isFilled ? "gold" : "none"}
					stroke="currentColor"
					strokeWidth="2"
					width="32"
					height="32"
					style={{ cursor: "pointer" }}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
			))}
		</div>
	);
};

export default RatinngStars;
