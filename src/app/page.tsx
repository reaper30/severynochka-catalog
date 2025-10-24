"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import HomePageBreadcrumbs from "@/components/homePage/homeProdcrumbs";
import ProductsCardBlock from "@/components/homePage/productsCards/productsCardBlock";
import SearchBar from "@/components/homePage/searchBar";

export default function Home() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const category = searchParams?.get("category") || null

	const onCategorySelect = (cat: string) => {
		router.push(`?category=${cat}`)
	}

	return (
		<>
			<HomePageBreadcrumbs />
			<SearchBar onCategorySelect={onCategorySelect} />
			<ProductsCardBlock category={category} />
		</>
	);
}
