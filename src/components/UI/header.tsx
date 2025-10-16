"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Badge } from "@heroui/react";
import { Menu } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Package } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { User } from "@heroui/react";

export default function App() {


	return (
		<Navbar
			className="border-b border-divider bg-white shadow-md "
			maxWidth="full"
		>
			<div className="max-w-[1208px] w-full mx-auto flex items-center">
				{/* Logo/Brand with Catalog Button */}
				<NavbarBrand className="flex items-center ">
					<p className=" mr-10 flex text-lg items-center  font-extrabold text-black">Магазин</p>
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

					<NavbarItem>
						<Link href="#" className="flex flex-col items-center">
							<Heart className="text-black mb-1" strokeWidth={1} />
							<p className="text-xs text-black">Избранное</p>
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link href="#" className="flex flex-col items-center">
							<Package className="text-xl mb-1 text-black" strokeWidth={1} />
							<p className="text-xs text-black">Заказы</p>
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link href="#" className="flex flex-col items-center">
							<Badge showOutline={false} content="1" size="sm" className="text-white bg-orange-500">
								<ShoppingCart className="text-xl mb-1 text-black" strokeWidth={1} />
							</Badge>
							<p className="text-xs text-black">Корзина</p>
						</Link>
					</NavbarItem>
				</NavbarContent>

				{/* User Profile */}
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
