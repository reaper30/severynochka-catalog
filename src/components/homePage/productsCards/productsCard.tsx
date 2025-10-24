"use client"
import Link from "next/link";
import { Heart, Star } from 'lucide-react';
import Image from "next/image";
import { IProduct } from "@/types";


const ProductsCard = ({ productItem }: { productItem: IProduct }) => {
	const discountedPrice = productItem.price * (1 - (productItem.discountPercentage ?? 0) / 100)

	return (
		<div className="bg-white-100 shadow-md rounded-sm">
			{/* Верхняя Часть Карточки */}
			<div className="p-0 relative ">
				<Link href={`/products/${productItem.id}`}>
					<div className="w-full h-[160px] relative overflow-hidden">
						{/* Бейдж скидки */}
						{productItem.discountPercentage > 0 && (
							<span className="absolute rounded-sm z-10 bottom-2.5 left-2.5 text-white-100 text-[16px] px-2 py-[3px] bg-orange-100" >
								-{Math.round(productItem.discountPercentage)}%
							</span>
						)}
						{/* Кнопка избранное */}
						<button className=" absolute top-2 right-2 z-10  bg-grey-300 px-2 py-[3px] rounded-sm md:py-1">
							<Heart strokeWidth={1} className="w-6 h-6 text-grey-100  " />
						</button>
						<Image
							alt={productItem.title || ''}
							src={productItem.thumbnail}
							fill
							className=" object-contain group-hover:scale-105 transition-transform"
						/>
					</div>
				</Link>
			</div >

			{/* Нижняя Часть Карточки */}
			<div className=" flex flex-col p-2 gap-2 ">
				{/* Цены */}
				<div className=" flex justify-between gap-[38px]">
					<div>
						<p className="text-sm font-bold text-black-100 md:text-lg">
							{discountedPrice.toFixed(2).replace(".", ",")} ₽
						</p>
						<p className="text-xs text-grey-100 text-[10px] md:text-xs">С картой</p>
					</div>
					{productItem.discountPercentage > 0 && (
						<div className="flex flex-col justify-end">
							<p className="text-[10px] text-black-100 md:text-[16px]" >
								{productItem.price.toFixed(2).replace(".", ",")} ₽
							</p>
							<p className="text-xs text-grey-100 text-[10px] md:text-[12px]">Обычная</p>
						</div>
					)}
				</div>

				{/* Название товара */}
				<Link href={`/products/${productItem.id}`} className="w-full">
					<h3 className="text-[10px] overflow-hidden text-ellipsis line-clamp-3 text-black-100 md:text-[16px] md:line-clamp-2" >
						{productItem.title}
					</h3>
				</Link>

				{/* Рейтинг-звездочки*/}
				<div className="flex gap-1">
					{[...Array(5)].map((_, i) => (
						<div key={i}
						>
							<Star
								className={`w-4 h-4 outline-none ${i < Math.floor(productItem.rating)
									? "fill-orange-100" : "fill-grey-200"
									}`}
								strokeWidth={0.5}
							/>
						</div >
					))}

					{/* Кнопка "В корзину" */}
				</div>
				<button
					className="w-full py-2.5 px-4 text-green-100 text-sm border border-green-100 rounded-sm transition-transform duration-200 ease-out hover:bg-orange-100  hover:-translate-y-0.5 hover:text-white hover:shadow-sm md:text-[16px]"
				>
					В корзину
				</button>
			</div>
		</div >
	);
}

export default ProductsCard;