import { toast } from 'sonner';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { buildPublicShortURL, formatDateTime } from '@/lib/utils';
import { useURLStore } from '@/stores/urlStore';
import type { URLRecord } from '@/types/url';

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success('已复制到剪贴板');
  } catch {
    toast.error('复制失败');
  }
}

function HistoryItem({ record }: { record: URLRecord }) {
  const removeRecord = useURLStore((state) => state.removeRecord);
  const publicShortURL = buildPublicShortURL(record.urlCode);

  return (
    <li className="group flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <a
            href={publicShortURL}
            target="_blank"
            rel="noreferrer"
            className="block truncate font-serif text-lg tracking-tight hover:terracotta"
          >
            {publicShortURL}
          </a>
          <p className="truncate text-xs text-muted-foreground">
            {record.originURL}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(publicShortURL)}
            title="复制短链"
          >
            <Copy strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            asChild
            title="打开短链"
          >
            <a href={publicShortURL} target="_blank" rel="noreferrer">
              <ExternalLink strokeWidth={1.5} />
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeRecord(record.id)}
            title="从历史移除"
          >
            <Trash2 strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3 text-mono text-[11px] text-muted-foreground">
        <span>#{record.urlCode}</span>
        <span className="h-px flex-1 bg-border" />
        <span>{formatDateTime(record.createdAt)}</span>
      </div>
    </li>
  );
}

export function HistoryList() {
  const history = useURLStore((state) => state.history);
  const clearHistory = useURLStore((state) => state.clearHistory);

  return (
    <section className="flex h-full flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Archivio</h2>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            History · 仅保存在本地浏览器
          </p>
        </div>
        {history.length > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            清空
          </Button>
        ) : null}
      </div>
      <Separator />
      {history.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="font-serif text-lg italic text-muted-foreground">
            Nessuna cronologia
          </p>
          <p className="text-xs text-muted-foreground/70">
            生成的短链会出现在这里
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {history.map((record) => (
            <HistoryItem key={record.id} record={record} />
          ))}
        </ul>
      )}
    </section>
  );
}
