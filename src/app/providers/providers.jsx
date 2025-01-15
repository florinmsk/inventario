"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
