"use client";
import { useEffect, useState } from "react";

export default function useThemeMode() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return theme;
}
