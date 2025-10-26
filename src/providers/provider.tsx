"use client"
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<HeroUIProvider>
				{children}
			</HeroUIProvider>

		</QueryClientProvider>
	)
}