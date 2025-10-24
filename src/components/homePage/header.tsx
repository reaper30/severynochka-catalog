"use client"
import { Link, Button, Badge } from "@heroui/react";
import { Menu, ChevronDown } from 'lucide-react';
import { User } from "@heroui/react";
import { headerItemConfig } from "@/config/header.config";

export default function App() {


	return (
		<div
			className="mx-auto bg-white-100 py-[11px] shadow-md md:px-5 desktop:px-[116px]"
		>
			<div className=" md:flex md:justify-between desktop:flex justify-between">
				{/* Лого/название с кнопками */}
				<div className="flex px-4 justify-between md:items-center md:px-0 md:gap-5 md:mr-[230px] desktop:p-0">
					<Link href="/" className="">
						<p className="text-[15px] text-lg font-extrabold text-black-100">Магазин</p>
					</Link>
					<Button
						color="primary"
						variant="solid"
						startContent={<Menu />}
						className=" bg-green-100 w-[123px] text-white rounded hover:bg-orange-100"
					>
						Каталог
					</Button>
				</div>

				{/*Navigation Items*/}
				<div className="hidden md:flex md:gap-4  desktop:gap-8">
					<div className="flex md:gap-4 desktop:gap-6">
						{headerItemConfig.map((item) => {
							const IconComponent = item.icon;
							return (
								<div key={item.label} className="gap-2 md:flex md:flex-col md:items-center ">
									{item.badge ? (
										<Badge showOutline={false} content={item.badge} size="sm" className="text-white-100 bg-orange-100 ">
											<IconComponent className="text-xl mb-1 text-black-100" strokeWidth={1} />
										</Badge>

									) : (
										<IconComponent className="text-black-100 mb-1" strokeWidth={1} />
									)}
									<p className="text-xs text-black-100">{item.label}</p>
								</div>
							);
						})}
					</div>


					{/* Профиль пользователя */}
					<div className="hidden md:p-[5px] md:flex desktop:flex desktop:items-center desktop:gap-2.5 desktop:p-2">
						<User
							avatarProps={{
								src: "/Alex.png",
							}}
							name="Алексей"
							classNames={{
								name: "text-md md:hidden desktop:flex"
							}}
							className=" text-black-100 text-[16px]  font-weight desktop:gap-2.5"
						/>
						<ChevronDown strokeWidth={1} className="text-black-100 md:hidden desktop:flex" />
					</div>
				</div>
			</div>

		</div >
	);
}
