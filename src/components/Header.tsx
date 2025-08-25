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

  /* classe dos itens de navegação */
  const navClasses = (key: Props["current"]) =>
    [
      "relative rounded px-2 py-1 font-medium transition-colors cursor-pointer select-none",
      current === key
        ? "text-blue-900 dark:text-white bg-gradient-to-t from-blue-600/60 to-blue-600/0 dark:from-blue-500/50"
        : "text-inherit hover:text-blue-600 dark:hover:text-blue-400",
    ].join(" ");

  const headerClasses = [
    "fixed inset-x-0 top-0 z-50 border-b-2 backdrop-blur-md transition-colors",
    scrolled
      ? "bg-white/90 dark:bg-gray-900/90 border-black/10 dark:border-white/10"
      : "bg-transparent border-transparent",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <nav className="relative flex w-full items-center px-6 py-4">
        {/* ---------------- brand ---------------- */}
        <span
          onClick={() => onNav("home")}
          className="absolute left-6 flex cursor-pointer items-center"
          aria-label="Igor Garcia — Home"
        >
          {/* hexágono + IG (mesmo SVG de antes) */}
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
        </span>

        {/* ---------------- menu ---------------- */}
        <ul className="mx-auto flex gap-6">
          <li className={navClasses("about")} onClick={() => onNav("about")}>
            About
          </li>
          <li
            className={navClasses("projects")}
            onClick={() => onNav("projects")}
          >
            Projects
          </li>
          <li
            className={navClasses("contact")}
            onClick={() => onNav("contact")}
          >
            Contact
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
