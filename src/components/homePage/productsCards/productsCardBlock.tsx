"use client"
//import { useProducts } from "@/hooks/useProducts";
import { useInfiniteProducts } from "@/hooks/useProducts";
import ProductsCard from "./productsCard";
import { Button, Spinner } from "@heroui/react";
import { IProduct } from "@/types";

const ProductsCardBlock = ({ category }: { category?: string | null }) => {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteProducts({ category })

	if (isLoading) return <Spinner color="warning" className="flex justify-center items-center py-12" />;
	if (isError) return <div className="text-center text-black-100 text-xl">Ошибка при загрузке</div>;
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
		return <div className="text-black-100 text-center text-xl">Товары не найдены 🤔</div>;
	}
	return (
		<>
			{/* Карточки товаров */}
			<div className=" grid grid-cols-2 mx-auto gap-4 mr-2 ml-4 mb-6  md:grid-cols-3 md:gap-8 md:mx-4 desktop:grid-cols-4 desktop:gap-10 desktop:mx-29 desktop:mb-12 ">
				{allProducts?.map((product: IProduct) => (
					<ProductsCard key={product.id} productData={product} />
				)
				)}
			</div>
			{/* Кнопка загрузки еще */}
			{hasNextPage && (
				<div className="text-center mx-auto">
					<Button onPress={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className=" px-6 py-2 text-[16px] border border-grey-200 rounded-sm bg-white-100 hover:border-orange-100">
						{isFetchingNextPage ? (
							<div className="flex items-center justify-center gap-2">
								<Spinner color="warning" size="sm" />
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