import { axiosInstance } from '@/services/instance'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { IProduct } from '@/types'

const PRODUCTS_PER_PAGE = 16

interface ProductsResponse {
	limit: number
	products: IProduct[]
	skip: number
	total: number
}

interface ProductsQueryParams {
	limit: number
	skip: number
	q?: string
}

	// Фцнкция получения продукции по категориям или просто продукты
	const fetchProductsPage = async (
		pageParam: number,
		category?: string | null
	): Promise<ProductsResponse> => {
		try {
			const params: ProductsQueryParams = { limit: PRODUCTS_PER_PAGE, skip: pageParam }

			const url = category ? `/products/category/${encodeURIComponent(category)}` : `/products`
			const res = await axiosInstance.get<ProductsResponse>(url, { params })

			return res.data
		} catch (error) {
			console.error(error)
			throw new Error("Failed to fetch products")

		}
	}

// Функция для получения одного товара
export const fetchProductById = async (id: string): Promise<IProduct> => {
	try {
		const response = await axiosInstance.get<IProduct>(`/products/${id}`)

		return response.data
	}
	catch (error) {
		console.error(error)
		throw new Error('Не удалось получить товар')
	}
};

export function useInfiniteProducts({ category }: { category?: string | null }) {
	return useInfiniteQuery({
		queryKey: ['products', PRODUCTS_PER_PAGE, category ?? null],
		queryFn: (context: { pageParam?: unknown }) => {
			const pageParam = typeof context.pageParam === 'number' ? context.pageParam : 0
			return fetchProductsPage(pageParam, category)
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined
			const next = lastPage.skip + lastPage.limit
			return next >= lastPage.total ? undefined : next
		},
		initialPageParam: 0,
	})
}

// Хук для получения товаров со скидкой
export const useDiscountedProducts = () => {
	return useQuery({
		queryKey: ["products", "discounted"],
		queryFn: async () => {
			const data = await fetchProductsPage(0)
			// Фильтруем товары по скидке более 10%
			return data?.products?.filter(p => p.discountPercentage > 10) ?? []
		},
		initialData: []
	})
}

