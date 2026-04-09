import { useTheme } from "@/hooks/useTheme";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const icons = { light: FaSun, dark: FaMoon, system: FaDesktop } as const;
const titles = { light: "Dark", dark: "System", system: "Light" } as const;

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={toggle}
      title={`Switch to ${titles[theme]} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full
                 bg-gray-200/60 text-xl text-gray-700 transition-colors
                 hover:bg-gray-300 dark:bg-gray-700/60 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      <Icon />
    </button>
  );
}
