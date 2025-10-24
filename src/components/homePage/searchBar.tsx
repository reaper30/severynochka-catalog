'use client'
import { Search } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useState } from 'react';

type SearchBarProps = {
	onCategorySelect: (category: string) => void
}

const SearchBar = ({ onCategorySelect }: SearchBarProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState('')
	const { data: categoriesData } = useCategories()

	const filteredCategories = categoriesData?.filter(cat =>
		cat.name.toLowerCase().includes(value.toLowerCase()) && value.length > 0
	) ?? []


	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		setValue(newValue)

		const filtered = categoriesData?.filter(cat =>  // фильтруем категории отсюда так как Value в setstate обновляется не сразу, поэтому при вводе 1-го символа он еще пустой, что не позволит фильтровать с 1-го символа
			cat.name.toLowerCase().includes(newValue.toLowerCase()) && newValue.length > 0
		) ?? []
		setIsOpen(newValue.length > 0 && filtered.length > 0)
	}

	const highlightMatch = (text: string, query: string) => {
		if (!query) return text
		const regex = new RegExp(`(${query})`, 'gi')
		const parts = text.split(regex)
		return parts.map((part, i) => (
			regex.test(part) ? (
				<span key={i} className="text-green-100 font-semibold">{part}</span>
			) : (
				<span key={i}>{part}</span>
			)
		))
	}

	return (
		<div className="flex flex-col gap-4 mb-6 mx-auto md:mb-12 desktop:mb-12  px-4 desktop:px-[116px] desktop:gap-6">
			<h1 className="text-xl font-bold  text-black-100">Поиск</h1>
			<form onSubmit={(e) => e.preventDefault()}>

				{/* Input */}
				<div className="relative ">
					<input
						type="text"
						value={value}
						onChange={onChangeInput}
						placeholder="Найти товар"
						className="border relative border-green-100 w-full rounded-sm p-2 text-black-100 placeholder:text-grey-100 outline-0"
					/>
					<Search strokeWidth={1} className=" absolute right-3 top-1/2 -translate-y-1/2 text-black-100 " />

					{/* Строка результатов поиска категорий */}
					{isOpen && filteredCategories.length > 0 && (
						<div className="absolute top-full left-0 right-0 bg-white border-1 border-t-0 border-green-100 rounded-b-md shadow-lg z-10 max-h-60 overflow-y-auto mt-0.5">
							{filteredCategories.map(category => (
								<button
									key={category.slug}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 transition first:pt-3"
									onClick={() => {
										onCategorySelect(category.slug)
										setValue('')
										setIsOpen(false)
									}}
								>
									<p className="text-black-100">
										{highlightMatch(category.name, value)}
									</p>
								</button>
							))}
						</div>
					)}
				</div>


			</form>
		</div>
	)
}

export default SearchBar
