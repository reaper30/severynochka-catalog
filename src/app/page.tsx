"use client"
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BreadcrumbsBlock from "@/components/UI/breadcrumbs";
import Categories from "@/components/UI/catrgories";
import ProductsCardBlock from "@/components/UI/productsCards/productsCardBlock";
import SearchBar from "@/components/UI/searchBar";

export default function Home() {
	const [inputValue, setInputValue] = useState('')
	const searchParams = useSearchParams()
	const router = useRouter()
	const category = searchParams?.get('category') ?? undefined

	const onCategorySelect = (cat: string) => {
		router.push(cat === 'all' ? '/' : `?category=${cat}`)
	}

	return (
		<>
			<BreadcrumbsBlock />
			<SearchBar value={inputValue} onChange={setInputValue} onCategorySelect={onCategorySelect} />
			<Categories />
			<ProductsCardBlock inputValue={inputValue} category={category} />
		</>
	);
}
