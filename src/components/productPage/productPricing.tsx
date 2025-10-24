"use client"
import { IProduct } from "@/types"
import { Button } from "@heroui/react";
import { Info, ShoppingCart, BellOff } from 'lucide-react';
import Image from "next/image";

interface ProductPricingProps {
	product: IProduct
}

const ProductPricing = ({ product }: ProductPricingProps) => {
	const discount = product.discountPercentage ?? 0
	const currentPrice = product.price
	const discountPrice = discount > 0 ? (currentPrice * (1 - discount / 100)) : currentPrice

	const changeMark = (value: number | string) => String(value).replace(".", ",")

	return (
		<div>
			{/* Цена  */}
			<div className="grid grid-cols-2 items-center" >
				<div className="flex items-center justify-between col-span-2">
					<div>
						<p className="text-black-100 text-xl md:text-lg md:mb-1 desktop:mb-[6px] desktop:text-2xl">{changeMark(product.price)} ₽</p>
						<p className="text-grey-100 text-[10px] md:text-xs">Обычная цена</p>
					</div>
					<div >
						<p className="text-end text-black-100 text-2xl font-extrabold desktop:text-4xl">{changeMark(discountPrice.toFixed(2))} ₽</p>
						<p className="flex justify-end items-center gap-2 text-grey-100 text-[10px] md:text-xs">С картой северянки <Info className="text-black-100 " strokeWidth={1} /></p>
					</div>
				</div>

				{/* Кнопка, бонусы, уведомления */}
				<div className=" gap-2 mt-4 mb-6 col-span-2 flex flex-col items-center justify-center">
					<Button className="relative w-full rounded-sm bg-orange-100 text-white-100 flex justify-center items-center p-2 md:p-4 md:text-2xl md:w-[344px] md:h-[60px] desktop:min-w-[424px] desktop:min-h-15">
						<ShoppingCart className="absolute left-4 transform top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
						<span className="text-[16px] font-extralight md:text-2xl md:w-[272px]">В корзину</span>
					</Button>
					<div className="flex items-center justify-center gap-2">
						<Image src="/bonus.svg" alt="Бонусы" width={24} height={24} />
						<p className="text-green-100 py-[8.5px] text-[10px]">Вы получаете 10 бонусов</p>
					</div>
					<div className="flex items-center py-1 gap-2">
						<BellOff strokeWidth={1} className="text-black-100" />
						<p className="text-black-100 text-[10px]">Уведомить о снижении цены</p>
					</div>
				</div>
				{/* Бренд, страна, упаковка */}
				<div className="col-span-2">
					<div className="flex justify-between items-center px-2 text-[10px] h-6.5 text-black-100 bg-grey-300 md:text-xs">
						<span className="text-gray-600 ">Бренд</span>
						<span className="font-semibold  ">{product.brand}</span>
					</div>
					<div className="flex justify-between items-center px-2 text-[10px] h-6.5 text-black-100 md:text-xs">
						<span className="text-gray-600 	 ">Страна</span>
						<span className="font-semibold capitalize  ">Россия</span>
					</div>
					<div className="flex justify-between items-center px-2 text-[10px] h-6.5 text-black-100 bg-grey-300 md:text-xs">
						<span className="text-gray-600 	 ">Упаковка </span>
						<span className="font-semibold  ">{product.weight} г</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductPricing
