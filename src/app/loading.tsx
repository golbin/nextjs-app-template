import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    </main>
  );
}

