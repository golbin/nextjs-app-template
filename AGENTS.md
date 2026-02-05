# AGENTS.md

This repo aims to be a **multi-tenant SaaS template**. The agent prioritizes "server-side enforcement (authentication/authorization/tenant scope)" and uses **pnpm only**.

## Core Stack

- Next.js 16.1 (App Router) + Tailwind CSS 4 + shadcn/ui (new-york style, zinc)
- React 19.2 + TypeScript 5.9
- Better Auth 1.4 (API Route Handler: `/api/auth/[...all]`)
- Drizzle ORM 0.45 + PostgreSQL (Supabase: `postgres`)
- Zod 4.3 for validation

## Additional Libraries

- **@dnd-kit**: Drag-and-drop (used in DataTable row reordering)
- **@tanstack/react-table**: Headless table (used in DataTable)
- **recharts**: Charts (used in dashboard area chart)
- **lucide-react**: Icons
- **sonner**: Toast notifications
- **vaul**: Drawer component
- **next-themes**: Dark/light mode

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/auth/[...all]/  # Better Auth handler
│   ├── dashboard/          # Dashboard page
│   ├── layout.tsx          # Root layout (ThemeProvider, Toaster)
│   └── page.tsx            # Launcher page
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── *.tsx               # App components (sidebar, charts, etc.)
├── db/
│   ├── index.ts            # getDb() (server-only)
│   ├── schema.ts           # App schema
│   └── better-auth.schema.ts
├── hooks/
│   └── use-mobile.ts       # Mobile detection hook
├── lib/
│   ├── auth.ts             # createAuth()
│   ├── auth-client.ts      # React auth client
│   └── utils.ts            # cn() utility
├── data/
│   └── dashboard.json      # Dashboard sample data
└── types/
    └── index.ts            # Type definitions
```

## Local Development/Scripts

- Install/Run: `pnpm install`, `pnpm dev`
- Quality: `pnpm lint`, `pnpm typecheck`
- shadcn: `pnpm ui:init` (initialize), `pnpm ui:add <name>` (add component)
- Better Auth: `pnpm auth:secret` (generate secret), `pnpm auth:generate` (generate schema)
- Drizzle: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`

## shadcn/ui

**Current config** (`components.json`):
- Style: `new-york` (Radix UI based)
- Base color: `zinc`
- Note: shadcn/ui now also supports Base UI (`style: "base-vega"`) as alternative to Radix UI

**Installed components** (22):
```
avatar, badge, breadcrumb, button, card, chart, checkbox, drawer,
dropdown-menu, input, label, select, separator, sheet, sidebar,
skeleton, sonner, table, tabs, toggle, toggle-group, tooltip
```

**Adding components**: `pnpm ui:add <component-name>`
- Full list: https://ui.shadcn.com/docs/components
- Charts: https://ui.shadcn.com/charts

## Environment Variables

- See `env.example` for examples
- Required (when using auth/DB):
  - `DATABASE_URL` (Supabase PostgreSQL connection string, Transaction Pooler 포트 6543 권장)
  - `BETTER_AUTH_SECRET`

## Directory/File Standards

- Auth
  - `src/lib/auth.ts`: `createAuth()` (lazy creation; env validated on call)
  - `src/lib/auth-client.ts`: React client
  - `src/app/api/auth/[...all]/route.ts`: Better Auth handler mount
- DB
  - `src/db/index.ts`: `getDb()` (server-only)
  - `src/db/schema.ts`: App schema + `export * from "./better-auth.schema"`
  - `src/db/better-auth.schema.ts`: Better Auth CLI output (initially empty file)
  - `drizzle.config.ts`: drizzle-kit configuration
- UI
  - `components.json`, `src/app/globals.css` (Tailwind v4 CSS config), `src/lib/utils.ts` (cn)
- Pages/Prototypes
  - `/` → `src/app/page.tsx`: Launcher (button collection to navigate to sub-pages)
  - `/dashboard` → `src/app/dashboard/page.tsx`: Dashboard (original home screen)
  - When adding new prototypes: create `src/app/<slug>/page.tsx` and update home button list
  - When converting to single project: promote desired page to `src/app/page.tsx` and clean up unnecessary page folders (e.g., `src/app/dashboard`) and navigation links

## Next.js Writing Rules

- Write as Server Components by default; use `use client` only for UI interactions
- Do not import server-only modules (DB/auth) in Client Components
- Prefer Server Actions for writes/mutations (use Route Handlers only for external webhooks/callbacks)

## Multi-tenancy/RBAC Rules

- All domain queries/mutations must be scoped **on the server** using `session.userId` + `workspaceId` + `membership.role`
- Do not trust only `workspaceId` from the client; verify "the session is a member of that workspace"
- All tenant tables must include `workspace_id` (default schema in this repo: `src/db/schema.ts`)

## Security Guardrails

- No hardcoding secrets/keys (including code/commits/logs)
- Minimize PII (emails, etc.) in logs
- Do not rely solely on client-side authentication/authorization

## Schema Change Workflow

1. Modify/create `src/db/schema.ts` (and `src/db/better-auth.schema.ts`)
2. `pnpm db:generate`
3. `pnpm db:migrate`
