import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";

export const axiosInstance = axios.create({
	baseURL,
});
