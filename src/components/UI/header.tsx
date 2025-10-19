"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Badge } from "@heroui/react";
import { Menu, ChevronDown } from 'lucide-react';
import { User } from "@heroui/react";
import { headerNavItems } from "@/config/header.config";

export default function App() {


	return (
		<Navbar
			className="border-b border-divider bg-white shadow-md "
			maxWidth="full"
		>
			<div className="max-w-[1208px] w-full mx-auto flex items-center">

				{/* Лого/название с кнопками */}
				<NavbarBrand className="flex items-center ">
					<Link href="/" className="flex items-center">
						<p className=" mr-10 flex text-lg items-center  font-extrabold text-black">Магазин</p>
					</Link>
					<Button
						color="primary"
						variant="solid"
						startContent={<Menu />}
						className=" flex flex-start bg-[#70C05B]	 w-[123px] text-white rounded hover:bg-[#FF6633]"
					>
						Каталог
					</Button>
				</NavbarBrand>

				{/*Navigation Items*/}
				<NavbarContent className="hidden sm:flex gap-5 mr-10" justify="end">
					{headerNavItems.map((item) => {
						const IconComponent = item.icon;
						return (
							<NavbarItem key={item.label}>
								<Link href={item.href} className="flex flex-col items-center">
									{item.badge ? (
										<Badge showOutline={false} content={item.badge} size="sm" className="text-white bg-orange-500">
											<IconComponent className="text-xl mb-1 text-black" strokeWidth={1} />
										</Badge>
									) : (
										<IconComponent className="text-black mb-1" strokeWidth={1} />
									)}
									<p className="text-xs text-black">{item.label}</p>
								</Link>
							</NavbarItem>
						);
					})}
				</NavbarContent>

				{/* Профиль пользователя */}
				<NavbarContent justify="end" className=" !flex-[0_0_auto] ">
					<NavbarItem className="flex items-center">
						<User
							avatarProps={{
								src: "Alex.png",
							}}
							name="Алексей"
							className="text-black mr-8 font-weight"
						/>
						<ChevronDown strokeWidth={1} className="text-black" />
					</NavbarItem>
				</NavbarContent>
			</div>
		</Navbar>
	);
}
