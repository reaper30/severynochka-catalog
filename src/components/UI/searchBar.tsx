'use client'
import { Input } from '@heroui/react'
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
				<span key={i} className="text-[#70C05B] font-semibold">{part}</span>
			) : (
				<span key={i}>{part}</span>
			)
		))
	}

	return (
		<div className="mb-8 w-full max-w-[1208px] mx-auto">
			<h1 className="text-3xl font-bold mb-4 text-black">Поиск</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="relative w-full">
					<Input
						type="text"
						radius="sm"
						value={value}
						onChange={onChangeInput}
						placeholder="Найти товар"
						variant="flat"
						size="lg"
						classNames={{
							input: "text-black pr-10",
							inputWrapper: `bg-white shadow-sm transition-shadow !duration-200 w-full border-2 border-[#70C05B] data-[hover=true]:bg-white data-[hover=true]:shadow-lg data-[hover=true]:shadow-[#70C05B]/20 group-data-[focus=true]:bg-default-0 rounded-t-md  ${isOpen ? "rounded-b-none" : "rounded-b-md"}`,
						}}
					/>
					{isOpen && filteredCategories.length > 0 && (
						<div className="absolute top-[100%] left-0 right-0 bg-white border-l-2 border-r-2 border-b-2 border-[#70C05B] rounded-b-md shadow-lg z-10 max-h-60 overflow-y-auto -mt-[2px]">
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
									<p className="text-black">
										{highlightMatch(category.name, value)}
									</p>
								</button>
							))}
						</div>
					)}
					<Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#414141] pointer-events-none" />
				</div>
			</form>
		</div>
	)
}

export default SearchBar
