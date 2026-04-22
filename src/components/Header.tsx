// Header “one-page” — destaca botão ativo e faz scroll suave
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  current: "home" | "about" | "projects" | "contact";
  onNav: (key: Props["current"]) => void;
};

export function Header({ current, onNav }: Props) {
  /* sombra / cor de fundo ao rolar */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* -------- classe dos itens de navegação -------- */
  const navClasses = (key: Props["current"]) =>
    [
      "cursor-pointer select-none px-2 pb-1 font-medium transition-colors",
      "border-b-2", // traço na base
      current === key
        ? "border-blue-600 text-blue-900 dark:text-white" // ativo
        : "border-transparent hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400",
    ].join(" ");

  /* -------- classe do header -------- */
  const headerClasses = [
    "fixed inset-x-0 top-0 z-50 border-b-2 backdrop-blur-md transition-colors",
    scrolled
      ? "bg-white/90 dark:bg-gray-900/90 border-black/10 dark:border-white/10"
      : "bg-transparent border-transparent",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <nav aria-label="Main navigation" className="relative flex w-full items-center px-6 py-4">
        {/* ---------------- brand ---------------- */}
        <button
          type="button"
          onClick={() => onNav("home")}
          className="absolute left-6 flex cursor-pointer items-center bg-transparent border-none p-0"
          aria-label="Igor Garcia — Home"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-10 w-10 text-blue-900 dark:text-white"
          >
            <polygon
              points="50 4 90 25 90 75 50 96 10 75 10 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <text
              x="50"
              y="63"
              textAnchor="middle"
              fontSize="46"
              fontWeight="700"
              className="fill-current"
              fontFamily="Verdana, sans-serif"
            >
              IG
            </text>
          </svg>
        </button>

        {/* ---------------- menu ---------------- */}
        <ul className="mx-auto flex gap-6">
          <li>
            <button
              type="button"
              className={navClasses("about")}
              onClick={() => onNav("about")}
            >
              About
            </button>
          </li>
          <li>
            <button
              type="button"
              className={navClasses("projects")}
              onClick={() => onNav("projects")}
            >
              Projects
            </button>
          </li>
          <li>
            <button
              type="button"
              className={navClasses("contact")}
              onClick={() => onNav("contact")}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* ---------------- theme switch ---------------- */}
        <div className="absolute right-6">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
