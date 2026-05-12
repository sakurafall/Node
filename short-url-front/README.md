# Brevità — Short URL Atelier

`short-url` Express 服务的配套前端，意式极简风格。

## 技术栈

- React 19 + TypeScript
- Vite 6
- TailwindCSS 3 + shadcn/ui (New York · stone)
- Zustand（历史记录持久化到 `localStorage`）
- Sonner（轻量提示）
- Lucide Icons

## 设计语言：意式极简（干净）

- 米白底色 + 深炭灰文字，**陶土橙**作为唯一点缀
- EB Garamond 衬线作为标题；Inter 用于正文；JetBrains Mono 用于代码片段
- 细线分割（hairline border）、低圆角、近乎无阴影
- 大量留白、典雅而克制的意大利语点缀（_Brevità · Archivio · meno è più_）

## 接口对接

| 接口 | 方法 | 说明 |
| --- | --- | --- |
| `/v1/urlRecord` | POST | 创建/复用短链 |
| `/v1/:urlCode` | GET | 通过短码解析原始 URL |

环境变量在 `.env`：

```bash
VITE_API_BASE_URL=http://localhost:3000/v1
```

## 启动

```bash
pnpm install
pnpm dev
```

确保 Express 后端运行在 `http://localhost:3000`（默认 PORT=3000）。

## 目录结构

```text
src/
├── components/        # 业务 & shadcn UI 组件
│   └── ui/            # button / input / card / label / separator / sonner
├── lib/utils.ts       # cn() / 时间格式化
├── services/api.ts    # fetch 封装的接口层
├── stores/urlStore.ts # Zustand 历史记录 store
├── types/url.ts       # 接口与领域类型
├── App.tsx
├── main.tsx
└── index.css          # Tailwind + 设计令牌
```
