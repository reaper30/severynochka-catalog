import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { IProduct } from '@/types'
import { getProductById as apiGetProductById, getProducts as apiGetProducts, getProductsByCategory as apiGetProductsByCategory, type ProductsResponse } from '@/services/products'

const PRODUCTS_PER_PAGE = 16

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
		if (category) {
			return apiGetProductsByCategory(category, params)
		}
		return apiGetProducts(params)
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch products")

	}
}

// Функция для получения одного товара
export const fetchProductById = async (id: string): Promise<IProduct> => {
	return apiGetProductById(id)
};

// Получить продукты по категории (без бесконечной прокрутки)
export const fetchProductsByCategory = async (
	category: string,
	params?: Partial<ProductsQueryParams>
): Promise<ProductsResponse> => {
	const query = {
		limit: params?.limit ?? PRODUCTS_PER_PAGE,
		skip: params?.skip ?? 0,
		q: params?.q,
	}
	return apiGetProductsByCategory(category, query)
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

// Хук для одного товара
export const useProduct = (id?: string) => {
	return useQuery({
		queryKey: ['product', id ?? null],
		queryFn: async () => {
			if (!id) throw new Error('Отсутствует id товара');
			return fetchProductById(id);
		},
		enabled: !!id,
	});
}

// Хук для связанных товаров по категории (исключая текущий id)
export const useRelatedProducts = (
	category?: string,
	excludeId?: number,
	options?: { enabled?: boolean; limit?: number }
) => {
	return useQuery({
		queryKey: ['related', category ?? null, excludeId ?? null, options?.limit ?? PRODUCTS_PER_PAGE],
		queryFn: async () => {
			if (!category) return [] as IProduct[];
			const data = await fetchProductsByCategory(category, { limit: options?.limit ?? PRODUCTS_PER_PAGE });
			const filtered = data.products.filter(p => (excludeId ? p.id !== excludeId : true));
			return filtered;
		},
		enabled: options?.enabled ?? !!category,
		initialData: [] as IProduct[],
	});
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

