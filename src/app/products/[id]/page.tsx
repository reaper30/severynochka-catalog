'use client'

import { ProductBreadcrumbs, ProductSummary, ImageSlider, ProductPricing } from '@/components/productPage'
import { fetchProductById } from '../../../hooks/useProducts'
import { IProduct } from '@/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from "@heroui/spinner";
import { axiosInstance } from '@/services/instance'
import RatingHistogram from '@/components/productPage/RatingHistogram'
import Reviews from '@/components/productPage/Reviews'
import RelatedProduct from '@/components/productPage/relatedProducts'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import debounce from "lodash.debounce"
import Link from 'next/link'

const ProductPage = () => {
	const { id } = useParams()
	const productId = Array.isArray(id) ? id[0] : id


	const [product, setProduct] = useState<IProduct | null>(null)

	const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]); // Состояние для связанных продуктов
	const [relatedSlideIndex, setRelatedSlideIndex] = useState(0) // Состояние для слайдера связанных товаров
	const [visibleCount, setVisibleCount] = useState(2)

	const reviewsCount = product?.reviews?.length || 0 // Кол-во отзывов

	useEffect(() => {
		const handleResize = debounce(() => {
			const width = window.innerWidth
			setVisibleCount(
				width >= 1440 ? 4 :
					width >= 768 ? 3 :
						2
			)
		}, 250)

		handleResize()
		window.addEventListener("resize", handleResize)

		return () => {
			handleResize.cancel() // отменяем отложенный вызов при размонтировании
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const handleNext = () => {
		setRelatedSlideIndex(prev =>
			prev + visibleCount >= relatedProducts.length
				? 0
				: prev + visibleCount
		)
	}

	const handlePrev = () => {
		setRelatedSlideIndex(prev => Math.max(prev - visibleCount, 0))

	}

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
					const relatedRes = (await axiosInstance.get(`products/category/${product.category}`)).data
					const filteredRelated = relatedRes.products.filter((p: IProduct) => p.id !== product.id)

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
			{/* Навигация сайта */}
			<div className="flex flex-wrap mx-auto my-2 ml-3 gap-1 mr-5 items-center md:mt-4 md:m-4 desktop:mx-29 desktop:my-6">
				<ProductBreadcrumbs title={product.title} category={product.category} />
			</div>

			{/* Название товара*/}
			<div className="flex flex-col rounded-lg  gap-4 mx-3 mb-4 desktop:mx-[116px]">
				<ProductSummary product={product} reviewsCount={reviewsCount} />
			</div>

			<div className="grid grid-cols-1 auto-rows-auto mx-auto">
				{/* Секция "Описание товара" */}
				{/*Название, артикул, звездный рейтинг  + Cлайдер */}
				<section>
					<div className="flex flex-wrap flex-col mx-auto gap-4 sm:mx-3 mb-20 md:25 md:mx-4 md:flex-row md:justify-between desktop:mx-[116px] desktop:gap-16 desktop:mb-30">
						{/* Cлайдер */}
						<ImageSlider
							images={product.images}
							title={product.title}
							discount={product.discountPercentage}
							thumbsImages={thumbsImages}
						/>
						{/* Таблица с описанием това	ра  */}
						<ProductPricing product={product} />
					</div>
				</section>

				{/* Секция "С этим товаром покупают" */}
				<section>
					<div className="flex flex-col mx-3 gap-4 mb-20 md:mb-25 md:mx-4 md:gap-8 desktop:mb-30 desktop:gap-10 desktop:mx-[116px]">
						<p className="text-black-100 text-xl font-bold md:text-2xl desktop:text-4xl">С этим товаром покупают</p>
						<div className="flex flex-col gap-4 md:gap-6">
							{/* Контейнер карточек */}
							<div className="flex justify-between gap-4 md:gap-8 desktop:gap-10">
								{relatedProducts
									.slice(relatedSlideIndex, relatedSlideIndex + visibleCount)
									.map((relatedProduct) => (
										<div className="shrink-0 shadow-md rounded-sm gap-2 flex-1" key={relatedProduct.id}>
											< RelatedProduct productItem={relatedProduct} />
										</div>
									))}
							</div>

							{/* Кнопки */}
							<div className="flex items-center justify-between gap-4 desktop:hidden">
								<button
									aria-label="Показать предыдущие товары"
									onClick={handlePrev}
									disabled={relatedSlideIndex === 0}
									className="flex items-center justify-center text-black-100 w-10 h-10 rounded-sm border border-green-100 hover:bg-orange-100 disabled:text-grey-100 disabled:cursor-not-allowed"
								>
									<ChevronLeft strokeWidth={1} className="w-6 h-6" />
								</button>

								<button
									aria-label="Показать следующие товары"
									onClick={handleNext}
									disabled={relatedSlideIndex + visibleCount >= relatedProducts.length}
									className="flex items-center justify-center w-10 h-10 text-black-100 rounded-sm border border-green-100 hover:bg-orange-100 disabled:text-grey-100 disabled:cursor-not-allowed"
								>
									<ChevronRight strokeWidth={1} className="w-6 h-6" />
								</button>
							</div>
						</div>

					</div>
				</section >


				{/* Секция "Отзывы" */}
				< section >
					<div className="mb-20  flex flex-col gap-4 mx-3 md:mb-25 md:mx-4 desktop:mb-30 desktop:gap-10">
						<p className="text-black-100 text-xl font-bold md:text-2xl desktop:text-4xl">Отзывы</p>
						<div className="flex flex-col gap-4 md:flex-row md:gap-8 desktop:gap-[145px]">
							<RatingHistogram reviews={product.reviews} rating={product.rating} />
							<Reviews reviews={product.reviews} />
						</div>
					</div>
				</section >

				{/* Секция Акции */}
				<section >
					<div className="mx-3">
						{/* Текст акции + все акции */}
						<div className="flex justify-between items-center">
							<p className="text-xl text-black-100">Акции</p>
							<Link href="/" className="flex gap-2 items-center">
								<p className="text-[16px] text-grey-100">Все акции</p>
								<ChevronRight strokeWidth={1} className="text-grey-100" />
							</Link>
						</div>
						<div className="grid grid-cols-2">

						</div>
					</div>
				</section>

			</div >
		</>
	)
}


export default ProductPage