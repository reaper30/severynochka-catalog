"use client"

import { Star } from 'lucide-react';

interface StarRatingProps {
	value: number; // сколько звёзд закрасить (0..max)
	max?: number; // по умолчанию 5
	size?: number; // размер иконки
	strokeWidth?: number; // толщина обводки
	filledClassName?: string; // класс для закрашенной звезды
	emptyClassName?: string; // класс для пустой звезды
}

const StarRating = ({
	value,
	max = 5,
	size = 16,
	strokeWidth = 0.5,
	filledClassName = "fill-orange-100",
	emptyClassName = "fill-grey-200",
}: StarRatingProps) => {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: max }).map((_, i) => (
				<Star
					key={i}
					size={size}
					strokeWidth={strokeWidth}
					className={i < value ? filledClassName : emptyClassName}
				/>
			))}
		</div>
	);
};

export default StarRating;
