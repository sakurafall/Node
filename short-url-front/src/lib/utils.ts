import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 把后端返回的 shortURL 重写为前端可访问的地址。
 * 后端 `PROJECT_URL` 可能指向数据库端口等错误地址，前端展示与点击跳转都以
 * 当前页面所在 origin + urlCode 为准，这样 `http://localhost:5173/xxx` 才会被前端路由接管。
 */
export function buildPublicShortURL(urlCode: string) {
  return `${window.location.origin}/${urlCode}`;
}

export function formatDateTime(value: string | number | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
