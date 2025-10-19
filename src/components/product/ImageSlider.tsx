"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
	images: string[]
	title: string
	discount?: number
	thumbsImages: string[]
}

export const ImageSlider = ({ images, title, discount, thumbsImages }: ImageSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [fade, setFade] = useState(false)

	const goToPrevious = () => {
		setFade(true)
		setTimeout(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === 0 ? thumbsImages.length - 1 : prevIndex - 1
			)
			setFade(false)
		}, 150)
	}

	const goToNext = () => {
		setFade(true)
		setTimeout(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === thumbsImages.length - 1 ? 0 : prevIndex + 1
			)
			setFade(false)
		}, 150)
	}

	const goToSlide = (index: number) => {
		setFade(true)
		setTimeout(() => {
			setCurrentIndex(index)
			setFade(false)
		}, 200)
	}

	const currentImage = thumbsImages[currentIndex] || images[currentIndex] || images[0]

	return (
		<section className="flex flex-row gap-6 w-full min-[1440px]:max-w-[720px] min-[1440px]:max-h-[496px]">
			{/* Миниатюры слева */}
			<div className="flex flex-col gap-3 items-center justify-center flex-shrink-0">
				{thumbsImages.map((image, i) => (
					image ? (
						<button
							key={i}
							onClick={() => goToSlide(i)}
							className={`relative sm:h-24 sm:w-24 shadow-md rounded-lg hover:border-1 hover:border-gray-400 min-[1440px]:max-w-[64px] min-[1440px]:max-h-[86.4px]
							${i === currentIndex && "border-gray-300"}`}
						>
							<Image
								src={image}
								alt={`${title} thumbnail ${i + 1}`}
								className="rounded-lg object-contain p-1"
								fill
							/>
						</button>
					) : null
				))}
			</div>
			{/* Основноое фото справа */}
			<div className="flex-1 flex flex-col">
				<div className="relative h-[360px] rounded-2xl shadow-md  overflow-hidden sm:h-[420px] lg:h-[520px]">
					<div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
						<Image
							src={currentImage}
							alt={`${title} - ${currentIndex + 1}`}
							fill
							className="object-contain"
							sizes="(max-width: 1024px) 100vw, 520px"
							priority
						/>
					</div>
					{/* Бейдж скидки */}
					{discount && discount > 0 && (
						<div className="absolute right-6 top-6 z-10 rounded-lg bg-[#FF6633] px-3 py-1 font-semibold text-white">
							-{Math.round(discount)}%
						</div>
					)}
					{/* Кнопки переключения слайдов */}
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 z-20 p-2 -translate-y-1/2 rounded-lg bg-gray-200/50 hover:bg-gray-200/80 hover:shadow-lg"
						aria-label="Previous image"
					>
						<ChevronLeft size={24} className="text-gray-800" />
					</button>
					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 z-20 p-2 -translate-y-1/2 rounded-lg bg-gray-200/50 hover:bg-gray-200/80 hover:shadow-lg"
						aria-label="Next image"
					>
						<ChevronRight size={24} className="text-gray-800" />
					</button>

				</div>
			</div>
		</section>
	)
}
