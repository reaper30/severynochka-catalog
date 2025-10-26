"use client"

import { Heart, Star } from "lucide-react"
import { IProduct } from "@/types"
import { getReviewWord } from "@/utils"
import ShareButton from "./ShareButton"

interface ProductSummaryProps {
	product: IProduct
	reviewsCount: number
	onReviewsClick?: () => void
}

const ProductSummary = ({ product, reviewsCount, onReviewsClick }: ProductSummaryProps) => {
	if (!product) return null;

	const rating = product.rating ?? 0

	return (
		<>
			{/* Названик продукта */}
			<h1 className="text-xl font-bold text-black-100">
				{product.title}, Россия, {product.weight} г
			</h1>

			<div className="flex flex-col gap-2 md:flex-row md:gap-6">
				{/* Блок артикул + Рейтинг звездочки + n-отзывов	 */}
				<div className="flex flex-wrap items-center sm:gap-4 md:gap-6">
					{/* Артикул */}
					<span className="text-[10px] font-medium text-black-100">арт. {product.sku}</span>
					{/* Звездочки */}
					<div className="flex gap-1 ">
						{[...Array(5)].map((_, i) => {
							const isFilled = rating >= i + 1
							return (
								<Star
									key={i}
									size={18}
									spacing={4}
									className={` outline-0 ${isFilled ? "fill-orange-100" : "fill-grey-200"}`}
									strokeWidth={0}
								/>
							)
						})}
					</div>
					{/* n-отзывов */}
					<button
						type="button"
						onClick={() => onReviewsClick?.()}
						className="cursor-pointer text-xs text-black-100 font-medium underline underline-offset-4 transition-colors hover:text-green-100"
					>
						{reviewsCount} {getReviewWord(reviewsCount)}
					</button>
				</div>


				{/* Кнопки "поделиться и в избранное" */}
				<div className="flex gap-4 cursor-pointer">
					{/* Поделиться */}
					<div className="p-1" role="button">
						<ShareButton
							url={typeof window !== 'undefined' ? window.location.href : ''}
							title={product.title}
						/>
					</div>

					{/* В избранное */}
					<button className="text-black-100 flex gap-2 items-center">
						<Heart size={24} strokeWidth={1} />
						<span className="font-medium text-[10px]">
							В избранное
						</span>
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductSummary
