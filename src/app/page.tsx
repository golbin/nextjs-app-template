import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const prototypePages = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
] as const;

export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.26),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.20),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.16),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.26),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.22),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-indigo-500/25 to-cyan-400/25 blur-3xl motion-safe:animate-pulse" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/25 via-indigo-500/25 to-fuchsia-500/30 blur-3xl motion-safe:animate-pulse" />

      <div className="mx-auto flex min-h-svh w-full max-w-lg items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500/30 via-indigo-500/30 to-cyan-400/30 p-[1px] shadow-[0_10px_60px_-20px_rgba(99,102,241,0.55)]">
          <div className="rounded-2xl border bg-background/70 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col gap-2">
              <h1 className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                Next.js SaaS Template
              </h1>
              <p className="text-sm text-muted-foreground">
                Build your SaaS product with this template.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {prototypePages.map((page) => (
                <Button
                  key={page.href}
                  asChild
                  size="lg"
                  className="w-full justify-start bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 rounded-xl py-6 text-md font-bold text-white shadow-sm transition hover:brightness-105 active:brightness-95"
                >
                  <Link href={page.href}>{page.title}</Link>
                </Button>
              ))}

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full justify-center rounded-xl border-2 border-dashed bg-transparent py-6 text-md font-semibold text-muted-foreground shadow-none transition hover:bg-background/40 hover:text-foreground"
              >
                <div className="flex items-center gap-2">
                  <PlusIcon className="size-4" />
                  Add your idea here
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
