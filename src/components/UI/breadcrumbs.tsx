"use client"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { ChevronRight } from "lucide-react";

const BreadcrumbsBlock = () => {

	return (
		//Типо текст навигации по сайту
		<Breadcrumbs
			size="sm"
			className="font-bold h-[50px] mx-auto max-w-[1208px] flex items-center bg-white overflow-x-auto whitespace-nowrap"
			separator={<ChevronRight strokeWidth={1} className=" sm:mx-3 text-black" />}
		>
			<BreadcrumbItem classNames={{ item: "text-black text-sm font-thin truncate" }}>Главная</BreadcrumbItem>
			<BreadcrumbItem classNames={{ item: "text-gray-400 text-sm font-thin truncate" }}>Поиск</BreadcrumbItem>
		</Breadcrumbs>
	);
}

export default BreadcrumbsBlock;