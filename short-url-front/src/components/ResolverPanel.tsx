import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resolveOriginURL } from '@/services/api';
import type { ApiError } from '@/types/url';

export function ResolverPanel() {
  const [code, setCode] = useState('');
  const [origin, setOrigin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleResolve(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error('请输入短码');
      return;
    }
    setLoading(true);
    try {
      const response = await resolveOriginURL(trimmed);
      setOrigin(response.data);
    } catch (error) {
      const apiError = error as ApiError;
      setOrigin(null);
      toast.error(apiError?.message ?? '未找到对应的原始链接');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleResolve} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="resolver-code">短码反查 · Resolve</Label>
        <div className="flex gap-2">
          <Input
            id="resolver-code"
            placeholder="输入短码，例如 bMpGL_"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={loading}
          />
          <Button type="submit" variant="outline" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" strokeWidth={1.5} />
            ) : (
              <Search strokeWidth={1.5} />
            )}
            查询
          </Button>
        </div>
      </div>

      {origin ? (
        <div className="animate-fade-in border-l-2 border-[hsl(var(--terracotta))] bg-muted/40 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Origin URL
          </p>
          <a
            href={origin}
            target="_blank"
            rel="noreferrer"
            className="break-all text-sm text-foreground hover:terracotta"
          >
            {origin}
          </a>
        </div>
      ) : null}
    </form>
  );
}
