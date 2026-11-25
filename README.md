# Shop for Pets — Frontend

React SPA для інтернет-магазину товарів для домашніх тварин.

## Технології

| Технологія | Призначення |
|---|---|
| React 19 | UI-бібліотека |
| TypeScript 6 | Типізація |
| Vite 8 | Збірка та dev-сервер |
| React Router 7 | Маршрутизація |
| TanStack React Query | Кешування та синхронізація запитів |
| MUI (Material UI) 9 | Компоненти інтерфейсу |
| Zod | Валідація форм |
| Phosphor Icons | Іконки |

## Структура

```
src/
├── components/              # Загальні компоненти
│   ├── layout/              # Header, Footer, Main, Layout
│   ├── InfoState/           # Стани порожніх/помилкових сторінок
│   └── ProtectedRoute.tsx   # Захищені маршрути
│
├── features/                # Feature-модулі
│   ├── auth/                # Автентифікація
│   │   ├── api/             # API-виклики, authFetch з JWT refresh
│   │   ├── context/         # AuthContext (login, logout, isAuthenticated)
│   │   └── components/      # LoginForm, RegistrationForm
│   ├── cart/                # Кошик
│   │   ├── api/             # CRUD операції з кошиком
│   │   ├── context/         # CartContext (стан кошика)
│   │   └── components/      # CartBtn, CartOverview
│   ├── catalog/             # Каталог товарів
│   │   ├── api/             # Запити до продуктів, фільтрів
│   │   └── components/      # ProductCard, ProductDetails, ProductFilters, ProductsList
│   ├── favourite/           # Обрані товари
│   │   ├── api/             # API обраних
│   │   └── components/      # FavouriteButton (toggle)
│   └── profile/             # Профіль користувача
│       ├── api/             # API домашніх тварин
│       └── components/      # ProfileUser, ProfilePet, PetModal, AccordionPetItem
│
├── pages/                   # Сторінки
│   ├── HomePage/            # Каталог з фільтрами
│   ├── ProductDetailsPage/  # Деталі товару
│   ├── CartPage/            # Кошик
│   ├── ProfilePage/         # Профіль
│   ├── LoginPage/           # Вхід
│   ├── RegistrationPage/    # Реєстрація
│   └── NotFoundPage/        # 404
│
├── queries/                 # React Query хуки
│   ├── auth/                # useAuthMutations, useAuthQueries
│   ├── cart/                # useCartMutations, useCartQueries
│   ├── catalog/             # useCatalogQueries
│   ├── favourite/           # useFavouriteMutations, useFavouriteQueries
│   └── profile/             # useProfileMutations, useProfileQueries
│
├── schemas/                 # Zod-схеми валідації
├── types/api/               # Автогенеровані TypeScript типи з OpenAPI
├── ui/                      # UI-компоненти (Button, Input, Modal, ConfirmDialog)
├── utils/                   # Утиліти
├── theme.ts                 # MUI тема (палітра, типографіка)
└── App.tsx                  # Маршрутизація
```

## Маршрути

| Шлях | Сторінка | Доступ |
|---|---|---|
| `/` | Головна (каталог) | Публічний |
| `/product/:id` | Деталі товару | Публічний |
| `/login` | Вхід | Публічний |
| `/registration` | Реєстрація | Публічний |
| `/cart` | Кошик | Авторизований |
| `/profile` | Профіль | Авторизований |
| `*` | 404 | — |

## Встановлення

```bash
npm install
```

## Скрипти

| Команда | Опис |
|---|---|
| `npm run dev` | Генерація типів + запуск Vite |
| `npm run dev:client` | Тільки Vite dev-сервер |
| `npm run build` | Збірка для production |
| `npm run lint` | Перевірка ESLint |
| `npm run lint:fix` | ESLint з автофіксом |
| `npm run format` | Форматування Prettier |
| `npm run generate:types` | Генерація TS типів з OpenAPI (потрібен запущений бекенд) |

## Запуск

```bash
npm run dev:client
```

Dev-сервер: `http://localhost:3000/`

## Генерація типів

Типи для API генеруються автоматично з OpenAPI-схеми бекенду за допомогою `swagger-typescript-api`:

```bash
# Потрібен запущений бекенд на localhost:8000
npm run generate:types
```

Результат зберігається у `src/types/api/index.ts`.

## Конфігурація API

Базова URL бекенду задається у `src/data/user-config.json`:

```json
{
  "BASE_URL": "http://localhost:8000/api"
}
```
