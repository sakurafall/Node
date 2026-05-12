import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotFoundViewProps {
  urlCode: string;
  title?: string;
  message?: string;
}

export function NotFoundView({ urlCode, title, message }: NotFoundViewProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="animate-fade-in flex w-full max-w-md flex-col items-center gap-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Brevità · 404
          </span>

          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-7xl tracking-tight">404</h1>
            <p className="font-serif text-2xl italic text-foreground/80">
              {title ?? 'Codice non trovato'}
            </p>
            <p className="text-sm text-muted-foreground">
              {message ??
                '我们没有找到这枚短码对应的链接，它可能从未存在，或者已经被移除。'}
            </p>
          </div>

          <div className="hairline-t hairline-b w-full py-5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Requested code
            </span>
            <p className="mt-1 font-mono text-base">#{urlCode}</p>
          </div>

          <Button asChild variant="outline">
            <a href="/">
              <ArrowLeft strokeWidth={1.5} />
              返回 Brevità
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
