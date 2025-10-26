"use client"
import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteProducts } from "../../hooks/useProducts";
import { Heart } from 'lucide-react';


const ProductsCartBlock = () => {
	const { data } = useInfiniteProducts({})
	// data.pages is an array of pages; take first product of the first page
	const product = data?.pages?.[0]?.products?.[0]
	if (!product) return null

	const discountedPrice = product.price * (1 - (product.discountPercentage ?? 0) / 100)

	return (<>
		<Card className=" hover:shadow-lg transition-shadow w-[272px] h-[349px]">
			<CardBody className=" p-0 relative">
				<Link href={`/products/${product.id}`}>
					<div className="relative overflow-hidden bg-white w-full h-[272px]">
						{/* Бейдж скидки */}
						{product.discountPercentage > 0 && (
							<div
								className="absolute top-2 left-2 px-2 py-1 text-white text-sm font-medium rounded"
							>
								-{Math.round(product.discountPercentage)}%
							</div>
						)}

						{/* Кнопка избранное */}
						<button
							className="absolute top-2 right-2 bg-amber-200"
							onClick={(e) => e.preventDefault()}
						>
							<Heart strokeWidth={0.5} />
						</button>

						{/* Изображение товара */}
						<Image
							src={product.thumbnail}
							alt={product.title}
							fill
							className="object-contain p-4 group-hover:scale-105 transition-transform"
							sizes="(max-width: 768px) 50vw, 25vw"
						/>
					</div>
				</Link>
			</CardBody >

			<CardFooter className=" flex-col items-start gap-2 p-3 pt-2">
				{/* Цены */}
				<div className="flex items-baseline gap-4 w-full">
					<div>
						<div className="text-xl font-bold text-gray-900">
							{discountedPrice.toFixed(2)} ₽
						</div>
						<div className="text-xs text-gray-500 font-medium">С картой</div>
					</div>
					{product.discountPercentage > 0 && (
						<div>
							<div className="text-sm text-gray-400 line-through">
								{product.price.toFixed(2)} ₽
							</div>
							<div className="text-xs text-gray-500 font-medium">Обычная</div>
						</div>
					)}
				</div>

				{/* Название товара */}
				<Link href={`/products/${product.id}`} className="w-full">
					<h3 className="text-sm font-medium text-gray-700 line-clamp-2 hover:text-primary transition h-[45px]  md:h-12">
						{product.title}
					</h3>
				</Link>

				{/* Рейтинг */}
				<div className="flex items-center gap-0.5 mb-2">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							className={`w-4 h-4 ${i < Math.floor(product.rating)
								? 'text-orange-400 fill-orange-400'
								: 'text-gray-200 fill-gray-200'
								}`}
							viewBox="0 0 20 20"
						>
							<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
						</svg>
					))}
				</div>

				{/* Кнопка "В корзину" */}
				<button className="w-full py-2.5 px-4 border-2 rounded-lg font-medium transition text-sm">
					В корзину
				</button>
			</CardFooter>
		</Card >
	</>);
}

export default ProductsCartBlock;