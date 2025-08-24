// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- links ---------- */
  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded px-2 py-1 font-medium transition-colors",
      isActive
        ? "text-blue-900 dark:text-white bg-gradient-to-t from-blue-600/60 to-blue-600/0 dark:from-blue-500/50"
        : "text-inherit hover:text-blue-600 dark:hover:text-blue-400",
    ].join(" ");

  /* ---------- header ---------- */
  const headerClasses = [
    "fixed inset-x-0 top-0 z-50 border-b-2 backdrop-blur-md transition-colors",
    scrolled
      ? "bg-white/90 dark:bg-gray-900/90 border-black/10 dark:border-white/10"
      : "bg-transparent border-transparent",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <nav className="relative flex w-full items-center px-6 py-4">
        {/* Brand */}
        <Link to="/" className="absolute left-6 text-lg font-bold leading-none">
          Portfolio
        </Link>

        {/* Menu */}
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

        {/* Theme switch */}
        <div className="absolute right-6">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
