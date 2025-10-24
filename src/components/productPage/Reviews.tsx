"use client"

import { Fragment, useState } from 'react'
import { IReview } from '@/types'
import { Star, User } from 'lucide-react'

interface ReviewsProps {
	reviews?: IReview[] | null
}

const Reviews = ({ reviews }: ReviewsProps) => {
	const [localReviews] = useState<IReview[]>(reviews ?? [])
	const [rating] = useState(0)
	const [comment, setComment] = useState("")

	return (
		<div className="flex flex-col gap-4 md:gap-10 md:flex-1 ">
			{/* Список отзывов */}
			<div className="flex flex-col gap-4 md-gap-8 desktop:gap-10">
				{localReviews.length === 0 && <p>Нет отзывов</p>}
				{localReviews.map((r, i) => (
					<div key={i} className=" flex flex-col rounded gap-2">

						{/* Имя */}
						<div className="text-sm flex gap-2  text-black-100 items-center">
							<User strokeWidth={0.5} size={16} className="h-9 w-9 rounded-full border-1 border-frey-300" />
							<p className="text-[16px]">{r.reviewerName}</p>
						</div>

						{/* звезды + дата */}
						<div className="flex gap-4 items-center">
							<div className="flex items-center gap-1 text-orange-100">
								{[...Array(5)].map((_, i) => (
									<Star key={i} size={14} className={i < r.rating ? 'fill-orange-100' : 'fill-grey-200'} strokeWidth={i < r.rating ? 0 : 1} />
								))}
							</div>
							<span className="text-[10px]  text-grey-100 md:text-[12px]">{new Date(r.date).toLocaleDateString("ru-RU")}</span>
						</div>

						{/* Обзор */}
						<div className=" text-md text-black-100">{r.comment}</div>
					</div>
				))}
			</div>
			{/* Форма */}
			<form className="">
				<div className="flex flex-col gap-2 md:gap-4">
					<div className="flex items-center gap-4">
						<label className="text-black-100 font-bold text-[18px]">Ваша оценка</label>
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} size={24} className={i < rating ? "fill-orange-100" : "fill-grey-200"} strokeWidth={0.5} />
							))}
						</div>
					</div>
					<textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Отзыв" className=" border border-grey-200 placeholder-black-100 text-black-100 px-4 py-2 rounded h-25" />
					<button className="bg-orange-200 text-orange-100 p-2 w-[188px] rounded-sm ">Отправить отзыв</button>
				</div>
			</form>

		</div>
	)
}

export default Reviews
