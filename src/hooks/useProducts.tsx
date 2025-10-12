import { axiosInstance } from "@/services/instance";
import { useQuery } from "@tanstack/react-query";


	const getProducts = async () => {
		const res = await axiosInstance.get()
	}

const useProducts = (query) => {
	const {data} = useQuery({
		queryKey: ["products" ],
		quryFn: () => getProducts(query),
		initialData: []

	})
}