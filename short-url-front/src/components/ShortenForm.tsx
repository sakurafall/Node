import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createURLRecord } from '@/services/api';
import { useURLStore } from '@/stores/urlStore';
import type { ApiError, URLRecord } from '@/types/url';

interface ShortenFormProps {
  onCreated: (record: URLRecord, reused: boolean) => void;
}

export function ShortenForm({ onCreated }: ShortenFormProps) {
  const [originURL, setOriginURL] = useState('');
  const [urlCode, setUrlCode] = useState('');
  const [loading, setLoading] = useState(false);
  const upsertRecord = useURLStore((state) => state.upsertRecord);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedURL = originURL.trim();
    const trimmedCode = urlCode.trim();

    if (!trimmedURL) {
      toast.error('请输入原始链接');
      return;
    }

    setLoading(true);
    try {
      const response = await createURLRecord({
        originURL: trimmedURL,
        ...(trimmedCode ? { urlCode: trimmedCode } : {}),
      });
      const reused = response.message === 'Origin URL already exists';
      upsertRecord(response.data);
      onCreated(response.data, reused);
      toast.success(reused ? '该链接已存在，已为你复用' : '短链生成成功');
      setOriginURL('');
      setUrlCode('');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.message ?? '生成失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="origin-url">原始链接 · Origin URL</Label>
        <Input
          id="origin-url"
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="https://example.com/a/very/long/path"
          value={originURL}
          onChange={(event) => setOriginURL(event.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="url-code">
          自定义短码 · Custom code{' '}
          <span className="ml-2 normal-case tracking-normal text-muted-foreground/70">
            可选
          </span>
        </Label>
        <Input
          id="url-code"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="例如：launch-2026"
          value={urlCode}
          onChange={(event) => setUrlCode(event.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground/70">
          留空将由后端按 SHORT_URL_LENGTH 自动生成 url-safe 短码
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-muted-foreground/70">
          按 <kbd className="text-mono">⏎</kbd> 提交即可
        </p>
        <Button type="submit" size="lg" disabled={loading} className="min-w-36">
          {loading ? (
            <>
              <Loader2 className="animate-spin" strokeWidth={1.5} />
              处理中
            </>
          ) : (
            <>
              生成短链
              <ArrowRight strokeWidth={1.5} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
