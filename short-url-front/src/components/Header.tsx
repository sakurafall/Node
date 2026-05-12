import { Link2 } from 'lucide-react';
import { apiBaseURL } from '@/services/api';

export function Header() {
  return (
    <header className="hairline-b">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-sm bg-foreground text-background">
            <Link2 className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-xl italic tracking-tight">
              Brevità
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              A Short URL Atelier
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Endpoint
          </span>
          <code className="rounded-sm border border-border bg-card px-2 py-1 text-mono text-[11px] text-muted-foreground">
            {apiBaseURL}
          </code>
        </div>
      </div>
    </header>
  );
}
