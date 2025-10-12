import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer
	? process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com"
	: process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";

export const axiosInstance = axios.create({
	baseURL,
});
