# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install
pnpm install

# Typecheck (always from root — single-package tsc will fail)
pnpm run typecheck

# Build all (typecheck + build)
pnpm run build

# Dev servers (require env vars)
PORT=3000 DATABASE_URL="..." pnpm --filter @workspace/api-server run dev
PORT=5173 BASE_PATH="/" pnpm --filter @workspace/cavanha run dev

# Database migrations
DATABASE_URL="..." pnpm --filter @workspace/db run push
DATABASE_URL="..." pnpm --filter @workspace/db run push-force  # last resort

# API codegen (OpenAPI → Zod schemas + React Query hooks)
pnpm --filter @workspace/api-spec run codegen

# Run a utility script
pnpm --filter @workspace/scripts run <script-name>
```

## Architecture

pnpm monorepo with TypeScript composite projects. All packages use `tsconfig.base.json` (ES2022, bundler resolution, strict). Libs emit `.d.ts` only; JS bundling is done by esbuild/Vite.

### Dependency graph

```
artifacts/cavanha (React + Vite frontend)
  └─ lib/api-client-react (generated React Query hooks + custom fetch)

artifacts/api-server (Express 5 API)
  ├─ lib/api-zod (generated Zod schemas for request/response validation)
  └─ lib/db (Drizzle ORM + PostgreSQL, exports pool/db/schema)

lib/api-spec (OpenAPI 3.1 spec + Orval config)
  ├─ generates → lib/api-zod
  └─ generates → lib/api-client-react
```

### API server (`artifacts/api-server`)
- Entry: `src/index.ts` → reads PORT, starts Express
- App: `src/app.ts` → CORS, JSON parsing, mounts routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers (e.g., `health.ts` → GET `/api/healthz`)
- Build: `build.ts` uses esbuild with an allowlist of bundled deps → `dist/index.cjs`

### Frontend (`artifacts/cavanha`)
- React 19 + Vite + TailwindCSS v4 (`@tailwindcss/vite` plugin, `@import "tailwindcss"` syntax)
- Framer Motion for animations, Radix UI for accessible primitives
- `@` alias → `src/`, `@assets` alias → `attached_assets/`
- Brand colors: Navy `#0D2B5C`, Orange `#F5841F`
- Fonts: Nunito (body), Barlow Condensed (headings)
- State: React hooks for cart, React Query for API data, Intersection Observer for scroll sections

### Database (`lib/db`)
- Drizzle ORM with `node-postgres`. Requires `DATABASE_URL` env var.
- Schema pattern: one file per table in `src/schema/`, barrel export from `src/schema/index.ts`
- Each table exports: Drizzle table definition, `drizzle-zod` insert schema, inferred types

### Codegen flow
1. Edit `lib/api-spec/openapi.yaml`
2. Run `pnpm --filter @workspace/api-spec run codegen`
3. Orval generates into `lib/api-zod/src/generated/` and `lib/api-client-react/src/generated/`
4. Use generated Zod schemas in api-server, React Query hooks in frontend

## Key conventions

- Zod import: `from "zod/v4"` (not `from "zod"`)
- API responses are always validated with generated Zod schemas before sending
- `cn()` utility from `src/lib/utils.ts` combines `clsx` + `tailwind-merge`
- Windows dev: use `MSYS_NO_PATHCONV=1` when passing `/` as env var value in Git Bash
