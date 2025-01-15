"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Import dinamic pentru ThemeProvider
const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
