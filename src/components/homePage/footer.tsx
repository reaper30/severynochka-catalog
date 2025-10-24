"use client"
import Link from 'next/link'
import Image from 'next/image'
import { footerConfig, footerIconsConfig } from '@/config/footer.config'
import { headerItemConfig } from '@/config/header.config'
import { Badge, User } from '@heroui/react'
import { Menu } from 'lucide-react'

const Footer = () => {
	return (
		<footer>
			<div className="flex flex-col px-7 py-8 bg-beige-100 mt-20 gap-y-6 md:py-8 md:px-4 md:flex-row md:items-start md:mx-auto  desktop:pl-[105px] desktop:pr-[53px] desktop:py-6">
				{/*  360px. Магазин + номер тел.  */}
				<div className="flex items-center gap-x-[59px] text-sm justify-between  md:gap-x-4">
					<span className="font-bold text-[15px] text-black-100 md:mr-10">Магазин</span>
					<div className="flex gap-x-2 md:hidden">
						<Image src="/phone.svg" width={24} height={24} className="text-black-100" alt="Phone" />
						<span className="text-black-100 text-[16px]">8 800 777 33 33</span>
					</div>
				</div>

				{/* текст */}
				<div className="flex flex-wrap gap-4  md:gap-y-2">
					{footerConfig.map((item) => (
						<Link key={item.label} href={item.href} className={item.style}>
							{item.label}
						</Link>
					))}
				</div>

				{/*   Группа  телефона и иконок  */}
				<div className="flex flex-col gap-y-2 md:ml-auto desktop:flex-row desktop:gap-10 ">
					{/* Телефон  */}
					<div className="flex gap-x-2 items-center sm:hidden md:flex  desktop:order-1">
						<Image src="/phone.svg" width={24} height={24} className="text-black-100" alt="Phone" />
						<span className="text-black-100 text-[16px] md:whitespace-nowrap">8 800 777 33 33</span>
					</div>
					{/* Иконки  */}
					<div className="flex gap-2 items-center p-0.5 desktop:gap-4">
						{footerIconsConfig.map((item) => (
							<Image key={item.label} src={item.icon} width={20} height={20} alt={item.label} className=" w-5 h-5" />
						))}
					</div>
				</div>
			</div>

			{/* Header для Footer */}
			<div className="px-4 pt-[6.5px] md:hidden desktop:hidden">
				<div className="flex gap-[23px] items-center justify-between">
					{/* Кнопка Каталог */}
					<div className="">
						<button className="bg-white-100 flex flex-col justify-center gap-1 items-center text-orange-100 ">
							<Menu />
							<span className="text-[10px]">Каталог</span>
						</button>
					</div>

					{/*Иконки*/}
					{headerItemConfig.map((item) => {
						const IconComponent = item.icon;
						return (
							<div key={item.label} className="gap-1 flex flex-col items-center justify-center">
								{item.badge ? (
									<Badge showOutline={false} content={item.badge} size="sm" className="text-white-100 bg-orange-100 ">
										<IconComponent className="text-xl mb-1 text-black-100" strokeWidth={1} />
									</Badge>
								) : (
									<IconComponent className="text-black-100 mb-1" strokeWidth={1} />
								)}
								<p className="text-[10px] text-black-100">{item.label}</p>
							</div>
						);
					})}
					{/* Фото пользователя */}
					<User
						avatarProps={{
							src: "/Alex.png",
						}}
						name=""
						className="p-[5px]"
					/>

				</div>
			</div>
		</footer >
	);
}

export default Footer;