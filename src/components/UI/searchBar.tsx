'use client'
import { Input } from '@heroui/react'
import { Search } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';

type SearchBarProps = {
	value: string
	onChange: (v: string) => void
	onCategorySelect: (category: string) => void
}

const SearchBar = ({ value, onChange, onCategorySelect }: SearchBarProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const { data: categoriesData } = useCategories()
	const filteredCategories = categoriesData?.filter(cat =>
		cat.name.toLowerCase().includes(value.toLowerCase()) && value.length > 0
	) ?? []

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
		setIsOpen(e.target.value.length > 0 && filteredCategories.length > 0)
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
							inputWrapper: "bg-white shadow-sm w-full border-2 border-[#70C05B] data-[hover=true]:bg-white data-[hover=true]:shadow-lg data-[hover=true]:shadow-[#70C05B]/20 group-data-[focus=true]:bg-default-0",
						}}
					/>
					{isOpen && filteredCategories.length > 0 && (
						<div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
							{filteredCategories.map(category => (
								<button
									key={category.slug}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
									onClick={() => {
										onCategorySelect(category.slug)
										onChange('')
										setIsOpen(false)
									}}
								>
									<p className="text-black">
										{category.name}

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
