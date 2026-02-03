# Millionaire Quiz (Training App)

Тренировочное приложение для подготовки к телевикторине «Кто хочет стать миллионером?».  
Формат — тренажёр: таймер, очки за скорость, серии ответов, импорт своих вопросов, общий рейтинг (онлайн) и локальный гостевой режим.

## Стек
- Frontend: Vite + React + Tailwind
- Backend: Express (раздаёт статику `dist/public` + API)
- Auth: Auth.js (OAuth Google/Apple)
- DB: PostgreSQL
- Real-time рейтинг: WebSocket (`/ws/leaderboard`)

## Локальный запуск

### 1) Установить зависимости
```bash
npx pnpm install
```

### 2) Поднять PostgreSQL и создать БД
Если PostgreSQL не установлен:
```bash
brew install postgresql@16
brew services start postgresql@16
```

Создать базу:
```bash
/opt/homebrew/opt/postgresql@16/bin/createdb millionaire_quiz
```

Применить схему:
```bash
/opt/homebrew/opt/postgresql@16/bin/psql millionaire_quiz -f server/schema.sql
```

### 3) Переменные окружения
Скопируй `.env.example` в `.env` и заполни значения.

Минимально для локального запуска (без OAuth входа) достаточно:
- `DATABASE_URL`
- `AUTH_SECRET`

OAuth (Google/Apple) нужен для сохранения результатов в общий рейтинг.

### 4) Запуск
Backend (API + WebSocket):
```bash
npx pnpm dev:server
```

Frontend (Vite dev server, проксирует `/api` и `/ws` на backend):
```bash
npx pnpm dev
```

Открой: `http://localhost:3000`

## Production build
```bash
npx pnpm build
```

Запуск production сервера:
```bash
NODE_ENV=production node dist/index.js
```

## Деплой (Render + Postgres) — рекомендованный вариант

### 1) База данных
Подойдёт Render Postgres / Neon / Railway.

Настройки env:
- `DATABASE_URL` — строка подключения
- `DATABASE_SSL=true` — включить SSL для managed Postgres (часто требуется)

### 2) Web Service (backend + frontend вместе)
Сервер раздаёт `dist/public`, поэтому достаточно одного сервиса.

Render Web Service:
- Build Command:
  - `npx pnpm install --frozen-lockfile && npx pnpm build`
- Start Command:
  - `node dist/index.js`
- Env Vars:
  - `NODE_ENV=production`
  - `PORT=3000` (Render обычно выставляет сам, но можно явно)
  - `DATABASE_URL`
  - `DATABASE_SSL=true`
  - `AUTH_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `APPLE_CLIENT_ID`
  - `APPLE_CLIENT_SECRET`

### 3) OAuth Redirect URLs
Пусть домен сервиса будет `https://YOUR_DOMAIN`.

Google:
- Authorized redirect URI:
  - `https://YOUR_DOMAIN/api/auth/callback/google`

Apple:
- Redirect URL:
  - `https://YOUR_DOMAIN/api/auth/callback/apple`

Важно: без корректных redirect URL вход работать не будет.

## Гостевой режим
Без входа пользователи могут играть.
- Общий рейтинг виден (онлайн).
- Сохранение результата в общий рейтинг требует вход.
- Результаты гостя сохраняются локально (в браузере).

## Локализация вопросов
Азербайджанская база вопросов берётся из:
- `who_wants_to_be_millionaire_az_plus.json`

Переключение языка влияет на UI и на базу вопросов.

