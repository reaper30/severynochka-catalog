import { Star } from 'lucide-react'

// Переиспользуемые функции

// Форматирует число отзывов в правильную форму слова "отзыв"
export const getReviewWord = (count: number): string => {
	if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
	if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'отзыва';
	return 'отзывов';
};