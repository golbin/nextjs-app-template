# nextjs-app-template

A Next.js app template.

## Pages

- `/`: Launcher (button collection to navigate to sub-pages)
- `/dashboard`: Dashboard (original home screen)

Add new prototype pages as `src/app/<slug>/page.tsx`, and manage the home (`/`) button list in `src/app/page.tsx`.

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
cd nextjs-app-template
corepack enable
pnpm install

# Set up environment variables
cp env.example .env
# Edit .env and set BETTER_AUTH_SECRET (generate with: pnpm auth:secret)

pnpm dev
```
