"use client"
import Link from 'next/link'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { footerConfig, footerIconsConfig } from '@/config/footer.config'

const Footer = () => {
	return (
		<footer className="bg-orange-50 border-t border-gray-200 mt-16">
			<div className=" mx-auto  py-9 px-26">
				<div className="flex flex-wrap items-center justify-between gap-6">
					{/* Текст  слева у Footer */}
					<div className="flex flex-wrap items-center gap-10 text-sm ">
						{footerConfig.map((item) => (
							<Link key={item.label} href={item.href} className={item.style}>
								{item.label}
							</Link>
						))}
					</div>
					{/* Иконки + номер телефона в Footer */}
					<div className="flex items-center gap-4">
						{footerIconsConfig.map((item) => (
							<Button
								key={item.label}
								as={Link}
								href={item.href}
								isIconOnly
								variant="light"
								className="text-gray-600 hover:text-pink-500"
							>
								<Image src={item.icon} width={24} height={24} alt={item.label} className="w-6 h-6" />
							</Button>
						))}

						<div className="flex items-center gap-2 text-gray-800 ml-4">
							<Image src="/phone.svg" width={24} height={24} className="" alt="Phone" />
							<span className="">8 800 777 33 33</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer;