# AGENTS.md

This repo aims to be a **multi-tenant SaaS template**. The agent prioritizes "server-side enforcement (authentication/authorization/tenant scope)" and uses **pnpm only**.

## Core Stack

- Next.js (App Router) + Tailwind CSS + shadcn/ui
- Better Auth (API Route Handler: `/api/auth/[...all]`)
- Drizzle ORM + PostgreSQL (Supabase: `postgres`)

## Local Development/Scripts

- Install/Run: `pnpm install`, `pnpm dev`
- Quality: `pnpm lint`, `pnpm typecheck`
- shadcn:
  - Initialize (if needed): `pnpm ui:init`
  - Add component: `pnpm ui:add button`
- shadcn/ui Reference:
  - Components: https://ui.shadcn.com/docs/components
  - Charts (examples): https://ui.shadcn.com/charts/area
- Better Auth:
  - Generate secret: `pnpm auth:secret`
  - Generate Drizzle schema: `pnpm auth:generate`
- Drizzle:
  - Generate migration: `pnpm db:generate`
  - Apply migration: `pnpm db:migrate`
  - Studio: `pnpm db:studio`

## shadcn/ui Components/Charts List

Candidates for `<name>` in `pnpm ui:add <name>` (= docs slug):

```
accordion
alert
alert-dialog
aspect-ratio
avatar
badge
breadcrumb
button
button-group
calendar
card
carousel
chart
checkbox
collapsible
combobox
command
context-menu
data-table
date-picker
dialog
drawer
dropdown-menu
empty
field
form
hover-card
input
input-group
input-otp
item
kbd
label
menubar
native-select
navigation-menu
pagination
popover
progress
radio-group
resizable
scroll-area
select
separator
sheet
sidebar
skeleton
slider
sonner
spinner
switch
table
tabs
textarea
toast
toggle
toggle-group
tooltip
typography
```

Charts example pages (slug):

```
area
bar
line
pie
radar
radial
```

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
