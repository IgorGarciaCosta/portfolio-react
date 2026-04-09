import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme, type Applied } from "./themeTypes";

export { ThemeContext } from "./themeTypes";
export type { Theme, Applied, ThemeContextValue } from "./themeTypes";

const systemPrefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const stored = (localStorage.getItem("theme") as Theme) || "system";
  const [theme, setTheme] = useState<Theme>(stored);
  const [applied, setApplied] = useState<Applied>(
    stored === "system"
      ? systemPrefersDark()
        ? "dark"
        : "light"
      : (stored as Applied),
  );

  useEffect(() => {
    const root = document.documentElement;
    const resolve = (): Applied =>
      theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;

    const a = resolve();
    setApplied(a);
    root.classList.toggle("dark", a === "dark");
    localStorage.setItem("theme", theme);

    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      const next: Applied = e.matches ? "dark" : "light";
      setApplied(next);
      root.classList.toggle("dark", next === "dark");
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  const toggle = () =>
    setTheme((t) =>
      t === "light" ? "dark" : t === "dark" ? "system" : "light",
    );

  return (
    <ThemeContext.Provider value={{ theme, applied, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
