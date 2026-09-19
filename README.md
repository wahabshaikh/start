# start

Opinionated starter for shipping web + iOS products from one monorepo.

## Stack

- Web: vinext + React + Tailwind CSS v4 + shadcn/ui on Cloudflare Workers
- Mobile: Expo SDK 55 + Expo Router
- API: Hono on Cloudflare Workers
- Data: Cloudflare D1, R2, KV, Queues
- Auth: Better Auth
- Icons: Hugeicons
- Analytics: DataFast on web and mobile
- Support: Crisp on web and mobile
- Testing: Vitest/Cloudflare runtime, Playwright, Maestro
- Package manager: pnpm + Turborepo

## Quick start

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env
cp apps/api/.dev.vars.example apps/api/.dev.vars

pnpm dev
```

Run an individual surface:

```bash
pnpm dev:web
pnpm dev:api
pnpm dev:mobile
```

## First-time Cloudflare setup

Create the resources referenced by `apps/api/wrangler.jsonc` and replace the placeholder IDs:

```bash
wrangler d1 create start-db
wrangler r2 bucket create start-storage
wrangler kv namespace create CACHE
wrangler queues create start-jobs
```

Then apply migrations:

```bash
pnpm --filter @start/api db:migrate
```

Set production secrets with Wrangler rather than committing them:

```bash
cd apps/api
wrangler secret put BETTER_AUTH_SECRET
```

## Product workflow

1. Write product intent and constraints in `PRODUCT.md`.
2. Put durable engineering decisions in `ARCHITECTURE.md`.
3. Give Cursor agents tasks against GitHub branches.
4. Web changes must pass typecheck/build/Playwright.
5. Native changes must pass typecheck and Maestro on an iOS simulator.
6. Use the Mac worker only for Xcode/Simulator tasks; keep normal implementation in cloud agents.

## shadcn

The web app is configured as a shadcn monorepo with Hugeicons:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Keep `iconLibrary: "hugeicons"` in both shadcn configs.

## Analytics and support

Set the environment variables in the example env files. DataFast and Crisp simply stay disabled when their IDs are missing during local development.

## Mobile builds

The Crisp React Native SDK requires a development build rather than Expo Go. Use:

```bash
pnpm --filter @start/mobile ios
```

or EAS:

```bash
cd apps/mobile
eas build --profile development-simulator --platform ios
```

## Agent conventions

Read `AGENTS.md` before making changes. The default rule is: Cloudflare owns backend/runtime infrastructure; Expo owns native delivery; shared product logic stays framework-independent.
