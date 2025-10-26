"use client"
import Link from "next/link";
import { Heart, Star } from 'lucide-react';
import Image from "next/image";
import { IProduct } from "@/types";


const RelatedProduct = ({ productItem }: { productItem: IProduct }) => {
	const discountedPrice = productItem.price * (1 - (productItem.discountPercentage ?? 0) / 100)

	return (
		<>
			{/* Верхняя Часть Карточки */}
			<div className="">
				<Link href={`/products/${productItem.id}`}>
					<div className="min-h-40 relative overflow-hidden">
						{/* Кнопка избранное */}
						<button className=" absolute top-2 right-2 z-10  bg-grey-300/50 p-1  rounded-sm">
							<Heart strokeWidth={1} className="w-6 h-6 text-grey-100  " />
						</button>
						{/* Изображение товара */}
						<div className="">
							<Image
								alt={productItem.title || ''}
								src={productItem.thumbnail}
								fill
								className=" object-contain group-hover:scale-105 transition-transform"
							/>
						</div>

					</div>
				</Link>
			</div >

			{/* Нижняя Часть Карточки */}
			< div className=" flex  flex-col p-2 gap-2" >
				{/* Цены */}
				< div className="flex items-end gap-[38px] md:h-[42px]" >
					<p className="text-sm font-bold text-black-100 md:text-lg">
						{discountedPrice.toFixed(2).replace(".", ",")} ₽
					</p>
				</div >

				{/* Название товара */}
				< Link href={`/products/${productItem.id}`} className="h-[45px]" >
					<h3 className=" text-[10px] font-medium text-black-100 md:text-[16px] overflow-hidden text-ellipsis line-clamp-3 md:line-clamp-2" >
						{productItem.title}
					</h3>
				</Link >

				{/* Рейтинг-звездочки*/}
				< div className="flex gap-1" >
					{
						[...Array(5)].map((_, i) => (
							<div key={i}
							>
								<Star
									className={`w-4 h-4 outline-none ${i < Math.floor(productItem.rating)
										? "fill-orange-100" : "fill-grey-200"
										}`}
									strokeWidth={0.5}
								/>
							</div >
						))
					}

					{/* Кнопка "В корзину" */}
				</div >
				<button
					className="w-full py-2.5 font-medium px-4 text-green-100 text-sm border border-green-100 rounded-sm transition-transform duration-200 ease-out hover:bg-orange-100  hover:-translate-y-0.5 hover:text-white hover:shadow-sm md:p-2  md:text-[16px]"
				>
					В корзину
				</button>
			</div >
		</>
	);
}

export default RelatedProduct;