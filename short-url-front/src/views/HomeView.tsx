import { useState } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HistoryList } from '@/components/HistoryList';
import { ResolverPanel } from '@/components/ResolverPanel';
import { ResultPanel } from '@/components/ResultPanel';
import { ShortenForm } from '@/components/ShortenForm';
import { Separator } from '@/components/ui/separator';
import type { URLRecord } from '@/types/url';

interface CurrentResult {
  record: URLRecord;
  reused: boolean;
}

export function HomeView() {
  const [current, setCurrent] = useState<CurrentResult | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container flex-1 py-16">
        <section className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* min-w-0 让 grid 列允许收缩；否则右栏长 URL 会撑爆，左栏被压成竖排 */}
          <div className="flex min-w-0 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                Studio · 工作台
              </span>
              <h1 className="font-serif text-5xl leading-tight tracking-tight sm:text-6xl">
                把长链路
                <br />
                凝练为一行字。
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Brevità 为你的链接做减法 — 输入任意 URL，得到一个干净、可记住的短链；
                也可以指定专属短码，让传播更具仪式感。
              </p>
            </div>

            <ShortenForm
              onCreated={(record, reused) => setCurrent({ record, reused })}
            />

            {current ? (
              <ResultPanel record={current.record} reused={current.reused} />
            ) : null}

            <Separator />

            <ResolverPanel />
          </div>

          <aside className="min-w-0 lg:border-l lg:border-border lg:pl-12">
            <HistoryList />
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
