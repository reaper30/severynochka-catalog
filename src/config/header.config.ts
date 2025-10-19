import { Heart, Package, ShoppingCart } from 'lucide-react';

export const headerNavItems = [
	{
		label: "Избранное",
		icon: Heart,
		href: "#"
	},
	{
		label: "Заказы",
		icon: Package,
		href: "#"
	},
	{
		label: "Корзина",
		icon: ShoppingCart,
		href: "#",
		badge: "1"
	},
]
