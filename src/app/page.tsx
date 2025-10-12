"use client"
import BreadcrumbsBlock from "@/components/UI/breadcrumbs";
import SearchBar from "@/components/UI/searchBar";
import { IProduct } from "@/types";
import { useState } from "react";

export default function Home() {

 	const [products, setProducts] = useState<IProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchMode, setSearchMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

	  async function handleSearch(query: string) {
    if (!query.trim()) {
      setFilteredProducts(products)
      setSelectedCategory('all')
      setSearchMode(false)
      return
    }
    try {
      setLoading(true)
      setSearchMode(true)
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error('Failed to search products')
      const data = await res.json()
      setFilteredProducts(data.products)
      setSelectedCategory('all')
      setError(null)
    } catch (err) {
      setError('Ошибка поиска товаров')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
		<>
		<BreadcrumbsBlock />
		<SearchBar onSearch={handleSearch} />
		</>
  );
}
