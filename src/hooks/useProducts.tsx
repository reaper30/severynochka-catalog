import { axiosInstance } from '@/services/instance'
import { useInfiniteQuery } from '@tanstack/react-query'
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

async function fetchProductsPage(
	pageParam: number,
	inputValue?: string,
	category?: string
): Promise<ProductsResponse> {
	const params: ProductsQueryParams = { limit: PRODUCTS_PER_PAGE, skip: pageParam }
	const q = inputValue && inputValue.trim() !== '' ? inputValue.trim() : undefined

	let res

	if (category && category !== 'all') {
		res = await axiosInstance.get<ProductsResponse>(`/products/category/${encodeURIComponent(category)}`, { params })
	} else if (q) {
		res = await axiosInstance.get<ProductsResponse>(`/products/search`, { params: { ...params, q } })
	} else {
		res = await axiosInstance.get<ProductsResponse>(`/products`, { params })
	}

	const data: ProductsResponse = res.data

	// apply lightweight client-side title filter when q provided
	if (q) {
		const qLower = q.toLowerCase()
		data.products = data.products.filter((p) => (p.title || '').toLowerCase().includes(qLower))
	}

	return data
}

export function useInfiniteProducts({ inputValue, category }: { inputValue?: string; category?: string }) {
	return useInfiniteQuery<ProductsResponse, unknown, ProductsResponse>({
		queryKey: ['products', PRODUCTS_PER_PAGE, inputValue ?? null, category ?? null],
		queryFn: (context: { pageParam?: unknown }) => {
			const pageParam = typeof context.pageParam === 'number' ? context.pageParam : 0
			return fetchProductsPage(pageParam, inputValue, category)
		},
		getNextPageParam: (lastPage) => {
			const next = lastPage.skip + lastPage.limit
			return next >= lastPage.total ? undefined : next
		},
		initialPageParam: 0,
	})
}
