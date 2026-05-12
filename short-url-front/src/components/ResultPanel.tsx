import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { buildPublicShortURL, formatDateTime } from '@/lib/utils';
import type { URLRecord } from '@/types/url';

interface ResultPanelProps {
  record: URLRecord;
  reused: boolean;
}

export function ResultPanel({ record, reused }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const publicShortURL = buildPublicShortURL(record.urlCode);

  useEffect(() => {
    setCopied(false);
  }, [record.id]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicShortURL);
      setCopied(true);
      toast.success('已复制短链到剪贴板');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('复制失败，请手动复制');
    }
  }

  return (
    <div className="animate-fade-in flex flex-col gap-5 border border-border bg-card/60 p-6">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {reused ? 'Reused · 已存在记录' : 'Created · 新增'}
        </span>
        <span className="text-mono text-[11px] text-muted-foreground">
          {formatDateTime(record.createdAt)}
        </span>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Short URL
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={publicShortURL}
            target="_blank"
            rel="noreferrer"
            className="font-serif text-2xl tracking-tight text-foreground hover:terracotta transition-colors"
          >
            {publicShortURL}
          </a>
          <span className="text-mono text-xs text-muted-foreground">
            #{record.urlCode}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Origin
        </span>
        <p className="break-all text-sm text-foreground/80">
          {record.originURL}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check strokeWidth={1.5} />
              已复制
            </>
          ) : (
            <>
              <Copy strokeWidth={1.5} />
              复制短链
            </>
          )}
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={publicShortURL} target="_blank" rel="noreferrer">
            <ExternalLink strokeWidth={1.5} />
            打开短链
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={record.originURL} target="_blank" rel="noreferrer">
            <ExternalLink strokeWidth={1.5} />
            打开原始链接
          </a>
        </Button>
      </div>
    </div>
  );
}
