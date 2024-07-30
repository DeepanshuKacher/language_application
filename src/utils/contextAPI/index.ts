"use client";

import { createContext } from "react";

export type Theme = "dark" | "light";

export const pageType = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  yearly: "yearly",
} as const;

export type DayEnum = keyof typeof pageType;

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
  // page: keyof typeof pageType;
  // setPage: (page: keyof typeof pageType) => void;
}

export const UniversalContext = createContext<ContextProps>({
  theme: "light",
  toggleTheme: () => {},
  // setPage: (page: keyof typeof pageType) => {},
  // page: "daily",
});
