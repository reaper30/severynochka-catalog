import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Use remotePatterns instead of deprecated `domains`.
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
				// allow any pathname under this host
				pathname: '/:path*',
			},
		],
	},
};

export default nextConfig;
