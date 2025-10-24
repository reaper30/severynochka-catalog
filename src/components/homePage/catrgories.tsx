//"use client"
//import { useCategories } from "@/hooks/useCategories";
//import { useState, useEffect } from "react";
//import { useRouter, useSearchParams } from 'next/navigation'
//import { X } from 'lucide-react'

//const Categories = () => {
//	const router = useRouter()
//	const searchParams = useSearchParams()
//	const initialFromUrl = searchParams?.get("category") ?? "all"
//	const [activeCategory, setActiveCategory] = useState(initialFromUrl)


//	useEffect(() => {
//		// keep local state in sync when user navigates (back/forward)
//		const p = searchParams?.get("category") || "all"
//		setActiveCategory(p)
//		// eslint-disable-next-line react-hooks/exhaustive-deps
//	}, [searchParams?.toString()])

//	const handleCategoryChange = (category: string) => {
//		setActiveCategory(category)

//		// update URL: preserve other params, set or remove `category`
//		const params = new URLSearchParams(searchParams)
//		if (category === "all" || !category) {
//			params.delete("category")
//		} else {
//			params.set("category", category)
//		}

//		const href = params.toString() ? `?${params.toString()}` : "/"
//		router.push(href)
//	}
//	const {
//		data: categoriesData,
//		error: categoriesError
//	} = useCategories()

//	if (categoriesError) return <div className="py-2 text-red-500">Ошибка загрузки категорий</div>

//	return (
//		<div className="w-full">
//			<div className="flex items-center px-2 py-2 max-w-[1208px] mx-auto">
//				<div className="flex flex-wrap gap-2 items-center">
//					{(categoriesData ?? []).map(category => (
//						<button
//							key={category.slug}
//							onClick={() => handleCategoryChange(category.slug)}
//							className={`px-2 py-1.5 rounded-md text-sm bg-zinc-200/50 border-0 text-black/75  hover:bg-zinc-300/50 flex items-center gap-1 ${activeCategory === category.slug ? "text-black/80 font-semibold" : ""}`}
//							title={category.name}
//						>
//							{/* Иконка категории */}
//							{activeCategory === category.slug && (
//								<X
//									className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer"
//									onClick={(e) => {
//										e.stopPropagation();
//										handleCategoryChange("");
//									}}
//								/>
//							)}
//							{category.name}

//						</button>
//					))}
//				</div>
//			</div>
//		</div>
//	)
//}

//export default Categories;