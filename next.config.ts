import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Используем современный формат allowlist для внешних изображений
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
			},
		],
	},
};

export default nextConfig;
