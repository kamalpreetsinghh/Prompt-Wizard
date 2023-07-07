"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: ReactNode;
};

const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default AppThemeProvider;
