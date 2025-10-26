"use client"
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

interface IHomePageBreadcrumbs {
	id: number,
	href: string,
	title: string,
	style: string
}

const HomePageBreadcrumbs = () => {

	const breadcrumbsArr: IHomePageBreadcrumbs[] = [
		{ id: 0, href: "/", title: "Главная", style: "text-[10px] md:text-xs font-medium" },
		{ id: 1, href: "/", title: "Поиск", style: "text-[10px] font-light md:text-xs font-medium" },
	]

	return (
		// Навигация по сайту
		<div className="flex items-center mt-2 mb-4 ml-3 gap-1 md:gap-2 md:mt-4 md:ml-4 desktop:gap-4 desktop:mb-6 desktop:ml-[116px]">
			{breadcrumbsArr.map((item, i: number) => (
				<Fragment key={item.id}>
					<Link
						href={item.href}
						className={`${item.style} ${i === breadcrumbsArr.length - 1 ? "text-grey-100" : "text-black-100"}`}
					>
						{item.title}
					</Link>
					{
						i < breadcrumbsArr.length - 1 && <ChevronRight strokeWidth={1} className="text-black-100" />
					}
				</Fragment>
			))
			}
		</div >
	);
}

export default HomePageBreadcrumbs;
