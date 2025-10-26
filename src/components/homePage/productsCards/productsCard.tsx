"use client"
import Link from "next/link";
import { Heart, Star } from 'lucide-react';
import Image from "next/image";
import { IProduct } from "@/types";


const ProductsCard = ({ productData }: { productData: IProduct }) => {

	const discountedPrice = productData.price * (1 - (productData.discountPercentage ?? 0) / 100)
	return (
		<div className="bg-white-100 shadow-md rounded-sm">
			{/* Верхняя Часть Карточки */}
			<div className="p-0 relative ">
				<Link href={`/products/${productData.id}`}>
					<div className="w-full h-40 relative overflow-hidden">
						{/* Бейдж скидки */}
						{productData.discountPercentage > 0 && (
							<span className="absolute rounded-sm z-10 font-medium bottom-2.5 left-2.5 text-white-100 text-[16px] px-2 py-[3px] bg-orange-100" >
								-{Math.round(productData.discountPercentage)}%
							</span>
						)}
						{/* Кнопка избранное */}
						<button className=" absolute top-2 right-2 z-10  bg-grey-300 p-1 rounded-sm md:py-1">
							<Heart strokeWidth={1} className="w-6 h-6 text-grey-100  " />
						</button>
						<Image
							alt={productData.title || ''}
							src={productData.thumbnail}
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
						<p className="text-xs font-medium text-grey-100 text-[10px] md:text-xs">С картой</p>
					</div>
					{productData.discountPercentage > 0 && (
						<div className="flex flex-col justify-end">
							<p className="text-[10px] font-medium text-black-100 md:text-[16px]" >
								{productData.price.toFixed(2).replace(".", ",")} ₽
							</p>
							<p className="text-xs text-grey-100 font-medium text-[10px] md:text-[12px]">Обычная</p>
						</div>
					)}
				</div>

				{/* Название товара */}
				<Link href={`/products/${productData.id}`} className="w-full">
					<h3 className="text-[10px] h-[45px] font-medium overflow-hidden text-ellipsis line-clamp-3 text-black-100 md:text-[16px] md:line-clamp-2" >
						{productData.title}
					</h3>
				</Link>

				{/* Рейтинг-звездочки*/}
				<div className="flex gap-1">
					{[...Array(5)].map((_, i) => (
						<div key={i}
						>
							<Star
								className={`w-4 h-4 outline-none ${i < Math.floor(productData.rating)
									? "fill-orange-100" : "fill-grey-200"
									}`}
								strokeWidth={0.5}
							/>
						</div >
					))}

					{/* Кнопка "В корзину" */}
				</div>
				<button
					className="w-full py-2.5 px-4 text-green-100 text-[16px] border border-green-100 rounded-sm transition-transform duration-200 ease-out hover:bg-orange-100 font-medium hover:-translate-y-0.5 hover:text-white hover:shadow-sm md:text-[16px]"
				>
					В корзину
				</button>
			</div>
		</div >
	);
}

export default ProductsCard;