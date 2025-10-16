import { axiosInstance } from '@/services/instance'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export interface Category {
	slug: string
	name: string
	url: string
}

// Функция для получения всех категорий
async function fetchCategories(): Promise<Category[]> {
	const { data } = await axiosInstance.get(`/products/categories`)
	return data
}

// Хук для получения всех категорий
export function useCategories(): UseQueryResult<Category[]> {
	return useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
		staleTime: 5 * 60 * 1000,
	})
}