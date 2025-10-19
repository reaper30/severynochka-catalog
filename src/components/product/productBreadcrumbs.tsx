"use client"

import Link from "next/link"
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react"
import { ChevronRight } from "lucide-react"

interface ProductBreadcrumbsProps {
	title: string
	category: string
}

const ProductBreadcrumbs = ({ title, category }: ProductBreadcrumbsProps) => {
	return (
		<Breadcrumbs
			separator={<ChevronRight strokeWidth={1} className="text-black" />}
			className="mx-auto mt-4 max-w-[1208px] overflow-x-auto whitespace-nowrap"
			itemClasses={{
				item: "text-xsm bg-red font-light",
				separator: "px-2",
			}}
		>
			<BreadcrumbItem>
				<Link className="text-[#414141]" href="/">Главная</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Link className="text-[#414141]" href="/">Каталог</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Link className="text-[#414141]" href={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
			</BreadcrumbItem>
			<BreadcrumbItem className="text-[#8F8F8F] " title={title}>
				{title}
			</BreadcrumbItem>
		</Breadcrumbs>
	)
}

export default ProductBreadcrumbs
