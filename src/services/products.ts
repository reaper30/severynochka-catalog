import { axiosInstance } from './instance';
import { IProduct } from '@/types';

export interface ProductsResponse {
	limit: number;
	products: IProduct[];
	skip: number;
	total: number;
}

export interface ProductsQueryParams {
	limit?: number;
	skip?: number;
	q?: string;
}

const DEFAULT_LIMIT = 16;

function normalizeProduct(p: IProduct): IProduct {
	return {
		...p,
		reviews: p.reviews ?? [],
	};
}

// GET /products
export async function getProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
	try {
		const query = {
			limit: params.limit ?? DEFAULT_LIMIT,
			skip: params.skip ?? 0,
			q: params.q,
		};
		const res = await axiosInstance.get<ProductsResponse>('/products', { params: query });
		const data = res.data;
		return {
			...data,
			products: data.products.map(normalizeProduct),
		};
	} catch (error) {
		console.error('getProducts error:', error);
		throw new Error('Не удалось получить список продуктов');
	}
}

// GET /products/category/:category
export async function getProductsByCategory(
	category: string,
	params: ProductsQueryParams = {}
): Promise<ProductsResponse> {
	try {
		const query = {
			limit: params.limit ?? DEFAULT_LIMIT,
			skip: params.skip ?? 0,
			q: params.q,
		};
		const url = `/products/category/${encodeURIComponent(category)}`;
		const res = await axiosInstance.get<ProductsResponse>(url, { params: query });
		const data = res.data;
		return {
			...data,
			products: data.products.map(normalizeProduct),
		};
	} catch (error) {
		console.error('getProductsByCategory error:', error);
		throw new Error('Не удалось получить продукты по категории');
	}
}

// GET /products/:id
export async function getProductById(id: string): Promise<IProduct> {
	try {
		const res = await axiosInstance.get<IProduct>(`/products/${id}`);
		return normalizeProduct(res.data);
	} catch (error) {
		console.error('getProductById error:', error);
		throw new Error('Не удалось получить товар');
	}
}
