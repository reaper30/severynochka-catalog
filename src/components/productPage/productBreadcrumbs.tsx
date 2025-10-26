"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Fragment } from "react"
import { useParams } from "next/navigation"

interface IProductPageBreadcrumbs {
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
	const { id } = useParams()

	const breadcrumbsArr: IProductPageBreadcrumbs[] = [
		{ href: "/", title: "Главная", style: "text-[10px] font-medium text-black-100 md:text-xs" },
		{ href: "/", title: "Каталог", style: "text-[10px] font-medium text-black-100  md:text-xs" },
		{ href: `/?category=${encodeURIComponent(category)}`, title: category, style: "text-[10px] font-medium text-black-100 md:text-xs" },
		{ href: `/products/${id}`, title: title, style: " text-grey-100 text-[10px] md:text-xs" },
	]

	return (
		<>
			{breadcrumbsArr.map((item, i) => (
				<Fragment key={i}>
					<Link
						href={item.href}
						className={`${item.style} ${i === breadcrumbsArr.length - 1 ? "pointer-events-none" : ""}`}
					>
						{item.title}
					</Link>
					{
						i < breadcrumbsArr.length - 1 && <ChevronRight strokeWidth={1} className="text-black-100" />
					}
				</Fragment>
			))}

		</>
	)
}

export default ProductBreadcrumbs
