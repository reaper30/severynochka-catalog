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
	const discountPrice = discount > 0 ? (currentPrice * (1 - discount / 100)).toFixed(2) : currentPrice

	const changeMark = (value: number) => String(value).replace(".", ",")

	return (
		<section className="  w-[424px]">
			{/* Цена  */}
			<div className="grid grid-cols-2 gap-y-2 items-center" >
				<div>
					<p className="text-[#414141] py-1 text-2xl">{changeMark(product.price)} ₽</p>
					<p className="text-[#8f8f8f] text-xs">Обычная цена</p>
				</div>
				<div className="">
					<p className="text-[#414141] text-4xl font-extrabold">{changeMark(discountPrice)} ₽</p>
					<p className="text-[#8f8f8f] text-xs">С картой северянки <Info className="inline" strokeWidth={1} /></p>
				</div>
				{/* Кнопка, бонусы, уведомления */}
				<div className="py-2 gap-2  col-span-2 flex flex-col items-center justify-center">
					<Button className="w-full relative rounded-sm bg-[#FF6633] text-white flex justify-center items-center py-7.5">
						<ShoppingCart className="absolute left-4 transform top-1/2 -translate-y-1/2 w-8 h-8" strokeWidth={1} />
						<span className="text-2xl font-extralight">В корзину</span>
					</Button>
					<div className="flex items-center justify-center gap-2 mt-2">
						<Image src="/bonus.svg" alt="Бонусы" width={24} height={24} />
						<p className="text-[#70c05b] text-xs">Вы получаете 10 бонусов</p>
					</div>
					<div className="  flex gap-2">
						<BellOff strokeWidth={1} className="text-[#414141]" />
						<p className="text-[#414141] text-xs">Уведомить о снижении цены</p>
					</div>
				</div>
				{/* Бренд, страна, упаковка */}
				<div className="col-span-2">
					<div className="flex justify-between items-center text-xs h-6.5 text-[#414141] bg-[#f3f2f1]">
						<span className="text-gray-600 px-2">Бренд</span>
						<span className="font-semibold px-2 min-[1440px]:px-[51px]">{product.brand}</span>
					</div>
					<div className="flex justify-between items-center  text-xs h-6.5 text-[#414141]">
						<span className="text-gray-600 	px-2">Страна</span>
						<span className="font-semibold capitalize min-[1440px]:px-[51px]">Россия</span>
					</div>
					<div className="flex justify-between items-center  text-xs h-6.5 text-[#414141] bg-[#f3f2f1]">
						<span className="text-gray-600 	px-2">Упаковка </span>
						<span className="font-semibold px-2 min-[1440px]:px-[51px]">{product.weight} г</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductPricing
