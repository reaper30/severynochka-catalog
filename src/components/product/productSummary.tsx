"use client"

import { Button } from "@heroui/react"
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
		<section className="rounded-lg mx-auto mt-6 mb-4">
			<h1 className="mt-2 text-2xl font-semibold text-[#414141] sm:text-3xl">
				{product.title}
			</h1>

			<div className="mt-4 flex items-center gap-6">
				{/* Артикул */}
				<span className="text-xs text-[#414141]">арт. {product.sku}</span>
				{/* Рейтинг звездочки + n-отзывов	 */}
				<div className="flex items-center gap-2 text-[#FF6633]">
					<div className="flex gap-1">
						{[...Array(5)].map((_, i) => {
							const isFilled = rating >= i + 1
							return (
								<Star
									key={i}
									size={18}
									className={`outline-0 ${isFilled ? "fill-[#FF6633]" : "fill-[#BFBFBF]"}`}
									strokeWidth={0}
								/>
							)
						})}
					</div>
					<span className="text-xs text-[#414141] underline underline-offset-4">
						{reviewsCount} {getReviewWord(reviewsCount)}
					</span>
				</div>

				{/* Поделиться */}
				<Button size="sm" variant="light" className="text-[#414141]">
					<Share2 size={24} strokeWidth={1} />
					<span className="text-xs">
						Поделиться
					</span>
				</Button>
				{/* В избранное */}
				<Button size="sm" variant="light" className="text-[#414141]">
					<Heart size={24} strokeWidth={1} />
					<span className="text-xs">
						В избранное
					</span>
				</Button>
			</div>
		</section>
	)
}

export default ProductSummary
