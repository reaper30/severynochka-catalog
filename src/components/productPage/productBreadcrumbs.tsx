"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Fragment } from "react"

interface IProductPageBreadcrumbs {
	id: number,
	href: string
	title: string
	category?: string,
	style: string
}

interface ProductBreadcrumbsProps {
	title: string
	category: string
}

const ProductBreadcrumbs = ({ title, category }: ProductBreadcrumbsProps) => {

	const breadcrumbsArr: IProductPageBreadcrumbs[] = [
		{ id: 0, href: "/", title: "Главная", style: "text-[10px] text-black-100 md:text-xs" },
		{ id: 1, href: "/", title: "Каталог", style: "text-[10px] text-black-100  md:text-xs" },
		{ id: 2, href: `/?${category}=${encodeURIComponent(category)}`, title: category, style: "text-[10px] text-black-100 font-light md:text-xs" },
	]

	return (
		<>
			{breadcrumbsArr.map((item, i) => (
				<Fragment key={item.id}>
					<Link
						href={item.href}
						className={`${item.style} `}
					>
						{item.title}
					</Link>
					{
						i < breadcrumbsArr.length - 1 && <ChevronRight strokeWidth={1} className="text-black-100" />
					}
				</Fragment>
			))}
			<div className="flex items-center gap-1">
				<ChevronRight strokeWidth={1} className="text-black-100" />
				<p className="text-grey-100 text-[10px] md:text-xs">
					{title}
				</p>
			</div>
		</>
	)
}

export default ProductBreadcrumbs
