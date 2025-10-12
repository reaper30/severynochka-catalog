import { axiosInstance } from "@/services/instance";
import { useQuery } from "@tanstack/react-query";


	const getProducts = async () => {
		const res = await axiosInstance.get(`/products`)
		console.log(res);

		return res
	}

export const useProducts = () => {
	const {data} = useQuery({
		queryKey: ["products" ],
		quryFn: () => getProducts(),
		initialData: []

	})

	return data
}