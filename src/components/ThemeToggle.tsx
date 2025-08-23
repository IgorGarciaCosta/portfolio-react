import { useTheme } from "@/hooks/useTheme";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // adicione setTheme no hook (próximo passo)

  /* itens do controle */
  const options = [
    { id: "light", icon: <FaSun />, label: "Light" },
    { id: "system", icon: <FaDesktop />, label: "System" },
    { id: "dark", icon: <FaMoon />, label: "Dark" },
  ] as const;

  /* posição do slider (0, 1 ou 2)      */
  /* tailwind widths: w-1/3 etc. */
  const index = options.findIndex((o) => o.id === theme);

  return (
    <div
      className="relative flex h-10 w-48 items-center overflow-hidden
                 rounded-full bg-gray-200/60 px-1 dark:bg-gray-700/60"
    >
      {/* slider de fundo */}
      <span
        className="absolute top-1 left-1 z-0 h-8 w-1/3 rounded-full
                   bg-blue-500 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {/* botões */}
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => setTheme(o.id)}
          className="relative z-10 flex flex-1 items-center justify-center gap-1
                     text-sm font-medium text-gray-700 transition-colors
                     dark:text-gray-200"
        >
          <span className="text-lg">{o.icon}</span>
          <span className="sr-only md:not-sr-only">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
