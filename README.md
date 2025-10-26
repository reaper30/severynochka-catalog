# Северяночка — каталог товаров

Небольшой e-commerce каталог на Next.js (App Router): список и поиск товаров, фильтрация по категориям, страница товара с отзывами, рейтингом, слайдером изображений и блоками «С этим товаром покупают» и «Акции».

## Возможности

- Главная страница с поиском и фильтрацией по категории (через query-параметр `?category=`)
- Пагинация «Загрузить ещё» (инфинитный список на React Query)
- Страница товара `/products/[id]` с:
	- крошками (Home → Каталог → Категория → Товар)
	- слайдером изображений и миниатюрами
	- ценами и скидками
	- рейтингом и отзывами
	- «С этим товаром покупают» (родственные по категории)
- Тосты и базовые UI-компоненты (HeroUI)

## Технологии

- Next.js 15 (App Router) + React 19 + TypeScript
- TanStack React Query v5 — загрузка данных, кеширование, состояния загрузки/ошибок
- Axios — HTTP-клиент (синглтон `axiosInstance`)
- Tailwind CSS v4 — стили
- HeroUI — компоненты UI
- Lucide Icons, Swiper, react-hot-toast

## Архитектура

- `src/services/` — слой данных (работа с API)
	- `instance.tsx` — настроенный axios с `baseURL`
	- `products.ts` — функции: `getProducts`, `getProductsByCategory`, `getProductById`, нормализация данных (например, `reviews: []` по умолчанию)
- `src/hooks/` — React-хуки (бизнес-логика на стороне клиента)
	- `useProducts.tsx` — `useInfiniteProducts`, `useProduct`, `useRelatedProducts`, `useDiscountedProducts`
- `src/app/` — маршруты (App Router)
	- `/page.tsx` — главная
	- `/products/[id]/page.tsx` — страница товара
- `src/components/` — презентационные компоненты

Разделение сервисы — для данных, хуки — для React: сервисы не зависят от React, а хуки отвечают за кеширование, состояния и интеграцию с UI.

## Структура проекта (сокращённо)

```
src/
	app/
		page.tsx
		products/[id]/page.tsx
		layout.tsx
	components/
		homePage/*
		productPage/*
	hooks/
		useProducts.tsx
	services/
		instance.tsx
		products.ts
	types/*
```


## Маршрутизация

- Главная: `/` — использует `useSearchParams` и пушит `?category=...`
- Товар: `/products/[id]` — получает `id` через `useParams`
- Крошки формируют ссылки на главную, «каталог», категорию и текущий товар

## Работа с API и состояния

- Все запросы идут через `services/products.ts`
- Хуки React Query возвращают `data`, `isLoading`, `isError`, `error`
- В UI предусмотрены понятные состояния загрузки и ошибок (спиннеры/сообщения)

## Требования

- Node.js 18.18+ или 20+
- npm 9+ (или совместимый менеджер пакетов)

## Запуск (Windows PowerShell)

1) Установить зависимости:

```powershell
npm install
```

2) (Опционально) Создать `./.env.local` и задать API-URL, если нужен другой бэкенд:

```dotenv
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

3) Запустить dev-сервер (используется Turbopack):

```powershell
npm run dev
```

Сайт будет доступен на http://localhost:3000

### Продакшн-сборка

```powershell
npm run build
npm start
```

### Линтинг

```powershell
npm run lint
```
