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

	const goToSlide = (index: number) => {
		setFade(true)
		setTimeout(() => {
			setCurrentIndex(index)
			setFade(false)
		}, 200)
	}

	const currentImage = thumbsImages[currentIndex] || images[currentIndex] || images[0]

	return (
		<div className="flex flex-row gap-4 desktop:gap-12">
			{/* Миниатюры слева */}
			<div className="flex flex-col gap-2 md:gap-4	">
				{thumbsImages.map((image, i) => (
					image ? (
						<button
							key={i}
							onClick={() => goToSlide(i)}
							className={`relative min-w-18 min-h-[43.2px]  shadow-md rounded-sm hover:border-1 hover:border-grey-200 md:min-w-16 md:min-h-[36.8px] desktop:min-w-16 desktop:min-h-[86.4]
							${i === currentIndex && "border-gray-300"}`}
						>
							<Image
								src={image}
								alt={`${title} thumbnail ${i + 1}`}
								className=" object-contain"
								fill
							/>
						</button>
					) : null
				))}
			</div>
			{/* Основноое фото справа */}
			<div className="flex-1 flex flex-col">
				<div className="relative rounded-sm shadow-md min-w-[248px] min-h-[248px] md:min-w-[272px] desktop:min-w-[608px] desktop:min-h-[496px]">
					<Image
						src={currentImage}
						alt={`${title} - ${currentIndex + 1}`}
						fill
						className="object-contain"
					/>
					{/* Бейдж скидки */}
					{discount && discount > 0 && (
						<div className="absolute right-2.5 top-2.5 z-10 py-[3px] px-2 rounded-sm bg-orange-100 desktop:right-5 desktop:top-5">
							-{Math.round(discount)}%
						</div>
					)}

				</div>
			</div>
		</div>
	)
}
