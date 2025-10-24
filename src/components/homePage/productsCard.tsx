"use client"
import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteProducts } from "../../hooks/useProducts";

const ProductsCartBlock = () => {
	const { data } = useInfiniteProducts({})
	// data.pages is an array of pages; take first product of the first page
	const product = data?.pages?.[0]?.products?.[0]
	if (!product) return null

	const discountedPrice = product.price * (1 - (product.discountPercentage ?? 0) / 100)

	return (<>
		<Card className="hover:shadow-lg transition-shadow w-[272px] h-[349px]">
			<CardBody className="p-0 relative">
				<Link href={`/products/${product.id}`}>
					<div className="relative overflow-hidden bg-white w-full h-[272px]">
						{/* Бейдж скидки */}
						{product.discountPercentage > 0 && (
							<div
								className="absolute top-2 left-2 z-10 px-2 py-1 text-white text-sm font-bold rounded"
								style={{ backgroundColor: '#FF6633' }}
							>
								-{Math.round(product.discountPercentage)}%
							</div>
						)}

						{/* Кнопка избранное */}
						<button
							className="absolute top-2 right-2 z-10"
							onClick={(e) => e.preventDefault()}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								className="hover:fill-red-500 transition"
							>
								<path
									d="M12.001 4.529C10.035 2.402 6.818 2.049 4.519 4.059C2.22 6.069 1.977 9.482 3.962 11.768L11.491 20.115C11.712 20.36 12.086 20.383 12.335 20.169L20.039 12.771C22.014 10.484 21.779 7.071 19.481 5.061C17.182 3.051 13.966 3.404 12.001 4.529Z"
									stroke="#C1C1C1"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
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

			<CardFooter className="flex-col items-start gap-2 p-3 pt-2">
				{/* Цены */}
				<div className="flex items-baseline gap-4 w-full">
					<div>
						<div className="text-xl font-bold text-gray-900">
							{discountedPrice.toFixed(2)} ₽
						</div>
						<div className="text-xs text-gray-500">С картой</div>
					</div>
					{product.discountPercentage > 0 && (
						<div>
							<div className="text-sm text-gray-400 line-through">
								{product.price.toFixed(2)} ₽
							</div>
							<div className="text-xs text-gray-500">Обычная</div>
						</div>
					)}
				</div>

				{/* Название товара */}
				<Link href={`/products/${product.id}`} className="w-full">
					<h3 className="text-sm text-gray-700 line-clamp-2 hover:text-primary transition min-h-[40px]">
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