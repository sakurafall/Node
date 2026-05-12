import type {
  ApiEnvelope,
  ApiError,
  CreateURLRecordPayload,
  URLRecord,
} from '@/types/url';

/**
 * 解析 API base：
 * 1. 若 `.env` 显式配置了 `VITE_API_BASE_URL`（非空、非 `auto`），使用配置值
 * 2. 否则按浏览器当前 host 自动拼接 `${protocol}//${hostname}:3000/v1`
 *
 * 这样设计的好处：
 * - 开发者本机访问 http://localhost:5173 → 自动指向 http://localhost:3000/v1
 * - 局域网同事访问 http://192.168.x.x:5173 → 自动指向 http://192.168.x.x:3000/v1
 *   无需为分享场景重新构建或改 .env
 */
const API_PORT = 3000;
const API_PATH_PREFIX = '/v1';

function resolveBaseURL() {
  const envValue = (import.meta.env.VITE_API_BASE_URL ?? '').trim();
  if (envValue && envValue.toLowerCase() !== 'auto') {
    return envValue.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location) {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${API_PORT}${API_PATH_PREFIX}`;
  }

  // SSR / 测试环境兜底
  return `http://localhost:${API_PORT}${API_PATH_PREFIX}`;
}

const BASE_URL = resolveBaseURL();

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  // 后端约定使用 JSON 响应；解析失败给出统一兜底
  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      (payload as { message?: string } | null)?.message ?? response.statusText;
    const error: ApiError = {
      message: message || '请求失败',
      status: response.status,
    };
    throw error;
  }

  return payload as T;
}

/**
 * 创建/复用短链
 * - 200: originURL 已存在，返回旧记录
 * - 201: 新建成功
 * - 400: 参数错误（非法 URL / urlCode 冲突）
 */
export async function createURLRecord(payload: CreateURLRecordPayload) {
  return request<ApiEnvelope<URLRecord>>('/urlRecord', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * 通过短码解析原始 URL
 * - 200: 命中
 * - 404: 未找到
 */
export async function resolveOriginURL(urlCode: string) {
  return request<ApiEnvelope<string>>(`/${encodeURIComponent(urlCode)}`, {
    method: 'GET',
  });
}

export const apiBaseURL = BASE_URL;
