import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

/* preferência real do sistema operacional */
const systemPrefersDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useTheme = () => {
  /* carrega do localStorage ou cai para 'system' */
  const stored = (localStorage.getItem('theme') as Theme) || 'system';
  const [theme, setTheme] = useState<Theme>(stored);

  useEffect(() => {
    const root = document.documentElement;

    /* qual tema realmente aplicar? */
    const applied = theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme;

    root.classList.toggle('dark', applied === 'dark');
    localStorage.setItem('theme', theme);

    /* se estiver em “system”, escuta mudanças do SO */
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      root.classList.toggle('dark', e.matches);
    };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [theme]);

  /* alternância simplificada: Light → Dark → System → Light… */
  const toggle = () =>
    setTheme(t => (t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light'));

  return { theme, setTheme, toggle };
};
