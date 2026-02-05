# nextjs-saas-template

A multi-tenant SaaS template built with Next.js 16, React 19, and modern tooling.

## Core Stack

- **Framework**: Next.js 16.1 (App Router) + React 19.2
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style)
- **Auth**: Better Auth 1.4
- **Database**: Drizzle ORM 0.45 + PostgreSQL (Supabase)
- **Validation**: Zod 4.3
- **Package Manager**: pnpm 9.x

## Features

- Dark/light mode (next-themes)
- Toast notifications (sonner)
- Data table with drag-and-drop row reordering (@dnd-kit + @tanstack/react-table)
- Interactive area charts (recharts)
- Responsive sidebar navigation

## Pages

- `/`: Launcher (button collection to navigate to sub-pages)
- `/dashboard`: Dashboard with sidebar, charts, and data table

Add new prototype pages as `src/app/<slug>/page.tsx`, and manage the home (`/`) button list in `src/app/page.tsx`.

## Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, API routes)
├── components/    # React components (ui/ for shadcn, others for app)
├── db/            # Database (Drizzle schema, connection)
├── hooks/         # Custom React hooks
├── lib/           # Utilities (auth, cn)
├── data/          # Sample data (JSON)
└── types/         # TypeScript type definitions
```

## Converting to a Single Project (Removing Launcher/Dashboard)

If you want to run a "single project" without multiple sub-pages, choose one of the options below.

### Option A) Promote a Specific Sub-page to `/`

Example: Making `/dashboard` the single project home

1. Move the contents of `src/app/dashboard/page.tsx` to `src/app/page.tsx` so `/` becomes that project.
2. If the launcher is no longer needed, delete the existing launcher and unused page folders.
3. Clean up navigation links (e.g., update `url: "#"` values in `src/components/app-sidebar.tsx` to actual paths for your project).

### Option B) Start with a Completely New Single Project

1. Rewrite `src/app/page.tsx` as the entry page for your new project.
2. To remove existing prototypes, delete folders like `src/app/dashboard` (and clean up related components/data as needed).

---

## Running (Standalone)

```bash
cd nextjs-saas-template
corepack enable
pnpm install

# Set up environment variables
cp env.example .env
# Edit .env and set BETTER_AUTH_SECRET (generate with: pnpm auth:secret)

pnpm dev
```
