import { createContext } from "react";

export type Theme = "light" | "dark" | "system";
export type Applied = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  applied: Applied;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
