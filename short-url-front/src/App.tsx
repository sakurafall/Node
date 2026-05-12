import { Toaster } from '@/components/ui/sonner';
import { HomeView } from '@/views/HomeView';
import { RedirectView } from '@/views/RedirectView';

/**
 * 极简前端路由：
 * - `/`          → 主页（生成 / 历史 / 反查工作台）
 * - `/:urlCode`  → 进入重定向流程，命中后用 window.location.replace 离开当前应用
 *
 * 之所以不引入 react-router：
 * 1. 路由形态非常简单，根 + 一段动态短码即可枚举完
 * 2. 重定向页是「访问即离开」的一次性页面，不需要应用内来回切换
 * 3. 保持依赖与意式极简风格一致 — 越少越好
 */
function App() {
  const pathname = window.location.pathname;
  const urlCode = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  return (
    <>
      {urlCode ? <RedirectView urlCode={urlCode} /> : <HomeView />}
      <Toaster />
    </>
  );
}

export default App;
