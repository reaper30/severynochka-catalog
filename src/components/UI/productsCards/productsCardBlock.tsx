"use client"
//import { useProducts } from "@/hooks/useProducts";
import { useInfiniteProducts } from "@/hooks/useProducts";
import ProductsCard from "./productsCard";
import { Button, Spinner } from "@heroui/react";

const ProductsCardBlock = ({ inputValue, category }: { inputValue?: string, category?: string }) => {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, } = useInfiniteProducts({ inputValue, category })

	if (!data) return null;
	const allProducts = data.pages.flatMap(page => page.products ?? []);

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-8 w-full max-w-[1208px] mx-auto">
				{allProducts?.map((product) => (
					<ProductsCard key={product.id} productItem={product} />
				)
				)}
			</div >

			{hasNextPage && (
				<div className="text-center flex-wrap flex-col justify-center">
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