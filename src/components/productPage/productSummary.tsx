"use client"

import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import { IProduct } from "@/types"
import { getReviewWord } from "@/utils"

interface ProductSummaryProps {
	product: IProduct
	reviewsCount: number
}

const ProductSummary = ({ product, reviewsCount }: ProductSummaryProps) => {
	if (!product) return null;

	const rating = product.rating ?? 0

	return (
		<>
			{/* Названик продукта */}
			< h1 className=" text-xl font-semibold text-black-100" >
				{product.title}, Россия, {product.weight} г
			</h1 >

			<div className="flex flex-col gap-2 md:flex-row md:gap-6">
				{/* Блок артикул + Рейтинг звездочки + n-отзывов	 */}
				<div className="flex flex-wrap items-center sm:gap-4 md:gap-6">
					{/* Артикул */}
					<span className="text-[10px] text-black-100">арт. {product.sku}</span>
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
					<span className="text-xs text-black-100 underline underline-offset-4">
						{reviewsCount} {getReviewWord(reviewsCount)}
					</span>
				</div>


				{/* Кнопки "поделиться и в избранное" */}
				<div className="flex gap-4">
					<button className="text-black-100 flex gap-2 items-center">
						<Share2 size={24} strokeWidth={1} />
						<span className="text-[10px]">
							Поделиться
						</span>
					</button>
					{/* В избранное */}
					<button className="text-black-100 flex gap-2 items-center">
						<Heart size={24} strokeWidth={1} />
						<span className="text-[10px]">
							В избранное
						</span>
					</button>
				</div>
				{/* Поделиться */}

			</div>
		</>
	)
}

export default ProductSummary
