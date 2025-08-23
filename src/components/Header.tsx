import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  /* classes compartilhadas dos links do menu */
  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded px-2 py-1 font-medium transition-colors",
      isActive
        ? "text-blue-900 dark:text-white bg-gradient-to-t from-blue-600/60 to-blue-600/0 dark:from-blue-500/50"
        : "text-inherit hover:text-blue-600 dark:hover:text-blue-400",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      {/* ----- NAV: largura total, itens posicionados via absolute ----- */}
      <nav className="relative flex w-full items-center px-6 py-4">
        {/* ------ Marca no canto ESQUERDO ------ */}
        <Link to="/" className="absolute left-6 text-lg font-bold leading-none">
          Portfolio
        </Link>

        {/* ------ MENU CENTRAL ------ */}
        <ul className="mx-auto flex gap-6">
          <NavLink to="/about" className={navItemClasses}>
            About
          </NavLink>
          <NavLink to="/projects" className={navItemClasses}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={navItemClasses}>
            Contact
          </NavLink>
        </ul>

        {/* ------ Toggle no canto DIREITO ------ */}
        <div className="absolute right-6">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
