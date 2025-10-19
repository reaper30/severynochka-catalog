"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import BreadcrumbsBlock from "@/components/UI/breadcrumbs";
import ProductsCardBlock from "@/components/UI/productsCards/productsCardBlock";
import SearchBar from "@/components/UI/searchBar";

export default function Home() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const category = searchParams?.get("category") || null

	const onCategorySelect = (cat: string) => {
		router.push(cat === 'all' ? '/' : `?category=${cat}`)
	}

	return (
		<>
			<BreadcrumbsBlock />
			<SearchBar onCategorySelect={onCategorySelect} />
			<ProductsCardBlock category={category} />
		</>
	);
}
