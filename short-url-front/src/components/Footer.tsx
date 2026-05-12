export function Footer() {
  return (
    <footer className="hairline-t">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
        {/* italic serif 在等字号下视觉偏小，显式加大以与右侧 mono 取齐 */}
        <p className="font-serif italic text-[16px]">
          Brevità · meno è più
        </p>
        <p className="text-mono">
          built with React 19 · Vite · shadcn/ui
        </p>
      </div>
    </footer>
  );
}
