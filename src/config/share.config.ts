export interface ShareItem {
	key: string;
	label: string;
	icon: string;
	handler: (url: string, title: string) => string;
}

export const shareConfig: ShareItem[] = [
	{
		key: "copy",
		label: "Скопировать ссылку",
		icon: "copy",
		handler: () => "copy",
	},
	{
		key: "vk",
		label: "ВКонтакте",
		icon: "/vk.svg",
		handler: (url, title) => `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
	},
	{
		key: "telegram",
		label: "Telegram",
		icon: "/tg.svg",
		handler: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
	},
	{
		key: "whatsapp",
		label: "WhatsApp",
		icon: "/whatsapp.svg",
		handler: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
	},
	{
		key: "facebook",
		label: "Facebook",
		icon: "/facebook.svg",
		handler: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
	},
	{
		key: "x",
		label: "X",
		icon: "/x-logo.svg",
		handler: (url, title) => `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
	},
];
