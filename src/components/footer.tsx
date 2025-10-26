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
			<div className="flex flex-col justify-between px-7 py-8 bg-beige-100 mt-20 gap-6 md:gap-0  md:mt-[71px] md:py-8 md:px-4 md:flex-row md:items-start desktop:gap-0  desktop:pr-[53px] desktop:pl-[105px]  desktop:py-6">
				{/*  360px. Магазин + Телефон  */}
				<div className="flex items-center gap-y-6 flex-wrap  text-sm justify-between md:flex-nowrap md:items-baseline md:gap-10">
					<span className="font-bold text-[16px] text-black-100">Магазин</span>
					{/* Телефон */}
					<div className="flex gap-x-2 md:hidden  ">
						<Image src="/phone.svg" width={24} height={24} className="text-black-100" alt="Phone" />
						<span className="text-black-100 text-[16px] font-medium">8 800 777 33 33</span>
					</div>
					{/* текст */}
					<div className="flex flex-wrap font-medium gap-4 md:gap-y-2 md:gap-x-4 desktop:mr-[133px] desktop:gap-10">
						{footerConfig.map((item) => (
							<Link key={item.label} href={item.href} className={item.style}>
								{item.label}
							</Link>
						))}
					</div>
				</div>



				{/*   Группа  телефона и иконок  */}
				<div className="md:flex md:flex-col md:gap-2 desktop:flex-row desktop:gap-10 ">
					{/* Телефон  */}
					<div className="hidden font-medium md:items-center  md:flex  md:gap-2 desktop:order-1">
						<Image src="/phone.svg" width={24} height={24} className="w-6 h-6 text-black-100" alt="Phone" />
						<span className="md:text-black-100 md:text-[16px] md:whitespace-nowrap">8 800 777 33 33</span>
					</div>
					{/* Иконки  */}
					<div className="flex gap-4 md:justify-end items-center md:gap-2 md:p-0.5 desktop:gap-4">
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
							<span className="text-[10px] font-medium">Каталог</span>
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
								<p className="text-[10px] text-black-100 font-medium">{item.label}</p>
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