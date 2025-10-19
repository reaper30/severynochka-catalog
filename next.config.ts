import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ['cdn.dummyjson.com'], // Используем domains вместо remotePatterns
	},
};

export default nextConfig;
