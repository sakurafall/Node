import { useEffect, useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveOriginURL } from '@/services/api';
import type { ApiError } from '@/types/url';
import { NotFoundView } from '@/views/NotFoundView';

type Status = 'loading' | 'redirecting' | 'not-found' | 'error';

interface RedirectViewProps {
  urlCode: string;
}

export function RedirectView({ urlCode }: RedirectViewProps) {
  const [status, setStatus] = useState<Status>('loading');
  const [origin, setOrigin] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // 仅靠 cancelled 标志去丢弃过期响应即可；
    // React 18+ StrictMode 下 effect 会跑两次，对幂等 GET 来说是安全的，
    // 不要再用 ref 去拦截「第二次 mount」否则会和 cancelled 一起把两次都干掉。
    let cancelled = false;
    let timer: number | undefined;

    (async () => {
      try {
        const response = await resolveOriginURL(urlCode);
        if (cancelled) return;
        setOrigin(response.data);
        setStatus('redirecting');
        // 让用户能看到一瞬间「即将跳转」的状态，避免视觉上的瞬切
        timer = window.setTimeout(() => {
          if (cancelled) return;
          window.location.replace(response.data);
        }, 450);
      } catch (error) {
        if (cancelled) return;
        const apiError = error as ApiError;
        if (apiError?.status === 404) {
          setStatus('not-found');
        } else {
          setErrorMsg(apiError?.message ?? '解析失败，请稍后再试');
          setStatus('error');
        }
      }
    })();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [urlCode]);

  if (status === 'not-found') {
    return <NotFoundView urlCode={urlCode} />;
  }

  if (status === 'error') {
    return <NotFoundView urlCode={urlCode} title="Errore" message={errorMsg} />;
  }

  const isRedirecting = status === 'redirecting';

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="animate-fade-in flex w-full max-w-md flex-col items-center gap-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Brevità · Reindirizzamento
          </span>

          <div className="relative grid place-items-center">
            <div className="absolute inset-0 -m-6 rounded-full border border-border" />
            <div className="absolute inset-0 -m-6 rounded-full border border-transparent border-t-[hsl(var(--terracotta))] animate-spin [animation-duration:1.6s]" />
            <Loader2
              className="h-6 w-6 text-foreground/40 animate-spin [animation-duration:2.4s]"
              strokeWidth={1.25}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-4xl italic leading-tight tracking-tight">
              {isRedirecting ? 'Andiamo…' : 'Un attimo…'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRedirecting
                ? '已找到链接，正在为你跳转'
                : '正在解析这枚短码对应的链接'}
            </p>
          </div>

          <div className="hairline-t hairline-b flex w-full flex-col gap-2 py-5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Codice
            </span>
            <span className="font-mono text-base text-foreground">
              #{urlCode}
            </span>
            {origin ? (
              <>
                <span className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Origin
                </span>
                <span className="break-all text-xs text-foreground/80">
                  {origin}
                </span>
              </>
            ) : null}
          </div>

          {/* indeterminate hairline progress bar */}
          <div className="relative h-px w-full overflow-hidden bg-border">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-[hsl(var(--terracotta))] [animation:slide_1.6s_ease-in-out_infinite]" />
          </div>

          {origin ? (
            <Button asChild variant="ghost" size="sm">
              <a href={origin} rel="noreferrer">
                如果浏览器没有自动跳转，点这里
                <ArrowUpRight strokeWidth={1.5} />
              </a>
            </Button>
          ) : null}
        </div>
      </main>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-110%); }
          50% { transform: translateX(120%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  );
}
