import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 backdrop-blur-md z-50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-4 px-6">
        <Link to="/" className="font-bold text-lg">
          MeuPortfólio
        </Link>

        <ul className="flex gap-6">
          <Link to="/about">Sobre</Link>
          <Link to="/projects">Projetos</Link>
          <Link to="/contact">Contato</Link>
        </ul>

        <button onClick={toggle}>{theme === "light" ? "🌙" : "☀️"}</button>
      </nav>
    </header>
  );
}
