"use client"
import { useRef, useState } from 'react';
import { Share2, Copy } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ShareButtonProps {
	url: string;
	title: string;
}

const ShareButton = ({ url, title }: ShareButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const openMenu = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};

	const closeMenuWithDelay = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 200);
	};

	// Оставляем только кастомную панель шаринга — всегда открываем локальное меню
	// (убираем вызов нативного Web Share API)

	const shareWindow = (shareUrl: string) => {
		window.open(shareUrl, "_blank", "width=600,height=400");
	};

	const onFacebook = () => shareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
	const onX = () => shareWindow(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
	const onVK = () => shareWindow(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
	const onTelegram = () => shareWindow(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
	const onWhatsApp = () => shareWindow(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			toast.success('Ссылка скопирована!');
			setIsOpen(false);

		} catch {
			toast.error('Не удалось скопировать ссылку');
			window.prompt("Скопируйте ссылку", url);
		}
	};

	return (
		<div
			className="relative inline-block"
			onMouseEnter={openMenu}
			onMouseLeave={closeMenuWithDelay}
		>
			<button
				className="flex items-center gap-2 px-3 py-2 rounded hover:bg-orange-300 transition"
				aria-haspopup="dialog"
			>
				<Share2 className="text-black-100" strokeWidth={1} size={18} />
				<span className="cursor-pointer text-black-100 font-medium text-[10px]">Поделиться</span>
			</button>

			{isOpen && (
				<>
					<div className="absolute left-0 mt-2 z-50  bg-white-100 text-black-100 rounded-sm shadow-sm p-3"
						onMouseEnter={openMenu}
						onMouseLeave={closeMenuWithDelay}>
						<div className="flex flex-col gap-1 ">
							<button onClick={onCopy} className="flex gap-2 cursor-pointer text-left text-[12px] text-nowrap p-1 hover:bg-orange-300 rounded   hover:scale-101">
								Скопировать ссылку
								<Copy strokeWidth={1} className="text-black-100 w-5 h-5" />
							</button>
							<button onClick={onVK} className="flex gap-2 cursor-pointer text-left text-[12px] p-1 hover:bg-orange-300 rounded hover:scale-101">
								<Image src="/vk.svg" alt="VK" width={20} height={20} />
								ВКонтакте
							</button>
							<button onClick={onTelegram} className="flex gap-2 cursor-pointer text-left text-[12px] p-1 hover:bg-orange-300 rounded hover:scale-101">
								<Image src="/tg.svg" alt="Telegram" width={20} height={20} />
								Telegram
							</button>
							<button onClick={onWhatsApp} className="flex gap-2 cursor-pointer text-left text-[12px] p-1 hover:bg-orange-300 rounded hover:scale-101">
								<Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
								WhatsApp
							</button>

							<button onClick={onFacebook} className="flex gap-2 cursor-pointer text-left text-[12px] p-1 hover:bg-orange-300 rounded hover:scale-101">
								<Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
								Facebook
							</button>
							<button onClick={onX} className="flex gap-2 cursor-pointer text-left text-[12px] p-1 hover:bg-orange-300 rounded hover:scale-101">
								<Image src="/x-logo.svg" alt="X" width={20} height={20} />
								X
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ShareButton;
