"use client"
import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import { Heart } from 'lucide-react';
import Image from "next/image";
import { Chip } from "@heroui/chip";


const ProductsCard = ({ productItem }) => {
	const discountedPrice = productItem.price * (1 - (productItem.discountPercentage ?? 0) / 100)

	return (<>
		<Card className="hover:shadow-lg shadow-md w-[272px] h-[349px]">
			<CardBody className="p-0 relative flex-none">
				<Link href={`/products/${productItem.id}`}>
					<div className="w-full h-[160px] relative overflow-hidden">
						{/* Бейдж скидки */}
						{productItem.discountPercentage > 0 && (
							<Chip radius="sm" className="absolute  bottom-2 w-[56px] h-[32px] left-2 text-white text-sm font-bold bg-[#FF6633]" >
								-{Math.round(productItem.discountPercentage)}%
							</Chip>
						)}
						{/* Кнопка избранное */}
						<button
							className="z-10 absolute top-2 right-2 rounded-sm p-1 bg-[#F3F2F1]/50 text-black/50 transition"
						>
							<Heart strokeWidth={1} className="w-6 h-6" />
						</button>
						{/* Изображение товара */}
						<Image
							unoptimized
							alt={productItem.title || ''}
							src={productItem.thumbnail}
							fill
							className="object-contain group-hover:scale-105 transition-transform"
							sizes="(max-width: 768px) 50vw, 25vw"
						/>
					</div>
				</Link>
			</CardBody >

			<CardFooter className="flex-col gap-2 p-2 h-[160px] overflow-visible items-baseline">
				{/* Цены */}
				<div className=" flex justify-between w-full">
					<div>
						<p className="text-xl font-bold text-gray-900">
							{discountedPrice.toFixed(2).replace(".", ",")} ₽
						</p>
						<p className="text-xs text-gray-500">С картой</p>
					</div>
					{productItem.discountPercentage > 0 && (
						<div>
							<p className="text-xl text-[#606060]">
								{productItem.price.toFixed(2).replace(".", ",")} ₽
							</p>
							<p className="text-xs text-[#8F8F8F]">Обычная</p>
						</div>
					)}
				</div>

				{/* Название товара */}
				<Link href={`/products/${productItem.id}`} className="w-full">
					<h3 className="text-sm text-[#414141] transition min-h-[40px] ">
						{productItem.title}
					</h3>
				</Link>

				{/* Рейтинг */}
				<div className="flex gap-1">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							className={`w-4 h-4 ${i < Math.floor(productItem.rating)
								? " fill-[#FF6633]"
								: " fill-[#BFBFBF]"
								}`}
							viewBox="0 0 20 20"
						>
							<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
						</svg>
					))}
				</div>

				{/* Кнопка "В корзину" */}
				<button
					className="w-full py-2.5 px-4 text-green-600 text-sm border border-green-500 rounded-lg bg-white transform transition-transform duration-200 ease-out hover:bg-[#FF6633]  hover:-translate-y-0.5 hover:text-white hover:shadow-sm active:translate-y-0"
					aria-label={`Добавить ${productItem.title} в корзину`}
				>
					В корзину
				</button>
			</CardFooter>
		</Card >
	</>);
}

export default ProductsCard;