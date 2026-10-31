# Млада гвардия — сайт на издателство

Пълен стек за сайта на издателство "Млада гвардия": Angular (standalone + signals + NgRx)
за фронтенда и Node.js/Express + MongoDB за бекенда.

## Структура

```
publisher-site/
  backend/     Express API + MongoDB (Mongoose)
  frontend/    Angular 21 SPA
  docker-compose.yml   локален MongoDB (безплатна community версия)
```

## Бърз старт

### 1. MongoDB (безплатна версия)

Вариант А — локално чрез Docker:

```bash
docker compose up -d
```

Вариант Б — [MongoDB Atlas Free Tier (M0)](https://www.mongodb.com/atlas), и после сложете
връзката в `backend/.env` като `MONGODB_URI`.

### 2. Бекенд

```bash
cd backend
cp .env.example .env
npm install
npm run seed   # добавя примерни книги и администраторски акаунт
npm run dev    # http://localhost:4000
```

Администраторски акаунт след seed: `admin@mladagvardiya.bg` / `admin12345`.

### 3. Фронтенд

```bash
cd frontend
npm install
npm start      # http://localhost:4200
```

## Технологии

**Фронтенд**
- Angular 21 (standalone компоненти по подразбиране, zoneless change detection)
- Signals за локално/UI състояние
- NgRx (`@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`) за глобално състояние —
  автентикация, книги, количка
- Нов control flow синтаксис (`@if`, `@for`)
- SCSS с дизайн токени (CSS custom properties) в червена цветова гама

**Бекенд**
- Node.js + Express (ESM)
- MongoDB + Mongoose
- JWT автентикация, bcrypt хеширане на пароли
- Rate limiting, Helmet, CORS

## Раздели на сайта

- Начало — препоръчани книги и мисия
- Книги / Е-книги — каталог с филтри по категория и странициране
- Страница на книга — детайли + добавяне в количка
- Търсачка — търсене по заглавие/автор/етикети (MongoDB text index)
- Онлайн магазин — количка и плащане (демо поръчка)
- Цели — мисия и ценности на издателството
- Контакти — форма за връзка
- Вход / Регистрация — JWT автентикация
- Профил — история на поръчките

## Предстоящо (извън обхвата на първоначалния скелет)

- Качване на корици на книги (вече е наличен `multer` в бекенда, нужна е качваща рутина)
- Админ панел за управление на книги и поръчки (API endpoint-ите вече съществуват)
- Истинско разплащане (в момента поръчката се записва в демо режим)
