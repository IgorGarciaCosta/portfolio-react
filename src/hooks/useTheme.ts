import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    // Adiciona a classe "dark" quando o tema é dark, remove caso contrário
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
  };
};
