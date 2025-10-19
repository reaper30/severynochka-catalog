"use client"
//import { useProducts } from "@/hooks/useProducts";
import { useInfiniteProducts } from "../../../hooks/useProducts";
import ProductsCard from "./productsCard";
import { Button, Spinner } from "@heroui/react";
import { IProduct } from "@/types";

const ProductsCardBlock = ({ category }: { category?: string | null }) => {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteProducts({ category })

	if (isLoading) return <Spinner color="warning" className="flex justify-center items-center py-12" />;
	if (isError) return <div>Ошибка при загрузке</div>;
	if (!data || data.pages.length === 0) return <div>Нет товаров</div>;

	// Проверка на pages и products не !== unedfined
	const allProducts = data.pages.flatMap((page): IProduct[] => {
		if (!page || !page.products) {
			console.warn('productsCardBlock: missing page or products', page);
			return [];
		}
		return page.products;
	});

	if (allProducts.length === 0) {
		return <div>Нет доступных товаров</div>;
	}

	return (
		<>
			{/* Карточки товаров */}
			<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-8 w-full max-w-[1208px] mx-auto">
				{allProducts?.map((product: IProduct) => (
					<ProductsCard key={product.id} productItem={product} />
				)
				)}
			</div>
			{/* Кнопка загрузки еще */}
			{hasNextPage && (
				<div className="text-center flex-wrap flex-col justify-center mx-auto max-w-[1208px]">
					<Button onPress={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className="mb-5 w-[172px] px-4 py-2 border mt-3 border-black/25 rounded bg-white  hover:bg-zinc-100/50">
						{isFetchingNextPage ? (
							<div className="flex items-center justify-center gap-2">
								<Spinner size="sm" />
								<span>Загрузка...</span>
							</div>
						) : (
							<span >Загрузить еще</span>
						)}
					</Button>
				</div>
			)}
		</>
	);
}

export default ProductsCardBlock;