"use client"
import { IReview } from '@/types'
import StarRating from './StarRating'

interface RatingHistogramProps {
	reviews: IReview[],
	rating: number
}

const RatingHistogram = ({ reviews, rating }: RatingHistogramProps) => {

	const counts = [5, 4, 3, 2, 1].map((rating) => ({
		rating,
		count: reviews.filter(r => r.rating === rating).length,
	}))

	return (
		// Общий рейтинu продукта
		<div className=" flex flex-col gap-4">
			<div className="flex gap-1 items-center">
				<StarRating value={rating} size={16} strokeWidth={0.5} />
				<span className="text-black-100 text-[18px] font-bold">{rating.toFixed()} из 5</span>
			</div>

			<div className="flex flex-col">
				{counts.map(({ rating, count }) => (
					<div key={rating} className="flex items-center gap-2 h-8 md:gap-4">
						{/* Номер  */}
						<p className=" text-[16px] text-black-100">{rating}</p>

						{/* Звездочки */}
						<div className="flex justify-center">
							<div className="flex gap-1">
								<StarRating value={rating} size={16} strokeWidth={0.5} />
							</div>
						</div>

						{/* Кол-во отзывов */}
						<p className=" text-[16px]  text-black-100 ">{count}</p>
					</div>
				))}
			</div>

		</div>
	)
}

export default RatingHistogram
