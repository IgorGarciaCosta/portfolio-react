import { useTheme } from "@/hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  /* tema efetivamente aplicado (se o hook ainda puder estar em 'system') */
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const applied = theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  /* qual ícone mostrar? */
  const Icon = applied === "dark" ? FaMoon : FaSun;

  const handleClick = () => setTheme(applied === "dark" ? "light" : "dark");

  return (
    <button
      onClick={handleClick}
      title={`Switch to ${applied === "dark" ? "Light" : "Dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full
                 bg-gray-200/60 text-xl text-gray-700 transition-colors
                 hover:bg-gray-300 dark:bg-gray-700/60 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      <Icon />
    </button>
  );
}
