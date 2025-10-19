'use client'

import { ProductBreadcrumbs, ProductSummary, ImageSlider, ProductPricing } from '@/components/product'
import { fetchProductById } from '../../../hooks/useProducts'
import { IProduct } from '@/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from "@heroui/spinner";
import { axiosInstance } from '@/services/instance'
import ProductsCard from '@/components/UI/productsCards/productsCard'
import { Star } from 'lucide-react'

const ProductPage = () => {
	const { id } = useParams()
	const productId = Array.isArray(id) ? id[0] : id
	const [product, setProduct] = useState<IProduct | null>(null)
	const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]); // Состояние для связанных продуктов

	const reviewsCount = product?.reviews?.length || 0 // Кол-во отзывов

	// Генерируем миниатюры для слайдера
	const thumbsImages: string[] = product ? (
		product.images.length >= 5
			? product.images
			: [...product.images, ...Array(5 - product.images.length).fill(product.thumbnail)]
	) : []

	// загружаем товар по id
	useEffect(() => {
		const loadProduct = async () => {
			if (!productId || isNaN(Number(productId))) return
			try {
				const product = await fetchProductById(productId)
				setProduct(product)

				// Загружаем похожие товары
				if (product.category) {
					const relatedRes = (await axiosInstance.get(`products/category/${product.category}?limit=5`)).data
					const filteredRelated = relatedRes.products.filter((p: IProduct) => p.id !== product.id)
					console.log(filteredRelated);

					setRelatedProducts(filteredRelated)
				}

			} catch (error) {
				console.error('Error fetching product:', error)
			}
		}
		loadProduct()
	}, [productId])


	if (!product) return <Spinner color="warning" className="flex justify-center items-center py-12" />;

	return (
		<>
			<div className=" mx-auto w-full max-w-[1208px] px-4 lg:px-0">
				{/* Навигация сайта */}
				<ProductBreadcrumbs title={product.title} category={product.category} />
			</div>

			{/* Секция "Описание товара" */}
			<div className="grid grid-cols-1 auto-rows-auto mx-auto w-full max-w-[1208px] gap-30 px-4 lg:px-0">
				{/*Название, артикул, звездный рейтинг и т.д. */}
				<section className="">
					<ProductSummary product={product} reviewsCount={reviewsCount} />
					<div className="flex justify-between">
						{/* Левая колонка - слайдер */}
						<ImageSlider
							images={product.images}
							title={product.title}
							discount={product.discountPercentage}
							thumbsImages={thumbsImages}
						/>
						{/* Правая колонка - цена */}
						<ProductPricing product={product} />
					</div>
				</section>

				{/*Секция "С этим товаром покупают"*/}
				<section className="gap-y-10 flex flex-col">
					<p className="text-[#414141] text-4xl">С этим товаром покупают</p>
					<div className="flex gap-10 ">
						{relatedProducts.map((relatedProduct) => (
							<div className=" min-[1440px]:max-w-[272px] min-[1440px]:max-h-[331px]" key={relatedProduct.id}>
								<ProductsCard key={relatedProduct.id} productItem={relatedProduct} />
							</div>
						))}
					</div>
				</section>

				{/* Секция "Отзывы" */}
				<section >
					<p className="text-[#414141] text-4xl">Отзывы</p>
					<div>
						<div className="flex gap-2">
							{[...Array(5)].map((_, i) => {
								const isFilled = product.rating >= i + 1
								return (
									<Star
										key={i}
										size={18}
										className={`outline-0 ${isFilled ? "fill-[#FF6633]" : "fill-[#BFBFBF]"}`}
										strokeWidth={0}
									/>
								)
							})}
							<span className="text-sm font-medium text-[#414141]">
								{product.rating.toFixed()} из 5
							</span>
							<div>
								{[...Array(5)].map((_, i) => {
									const isFilled = product.rating >= i + 1

									return (
										<>
											<p>{i + 1}</p>
											<Star
												key={i}
												size={18}
												className={`outline-0 ${isFilled ? "fill-[#FF6633]" : "fill-[#BFBFBF]"}`}
												strokeWidth={0}
											/>

										</>
									)
								})}
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}


export default ProductPage