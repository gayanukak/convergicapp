"use client";

import React from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "@/lib/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import { getTheme } from "@/theme";

// Client-side cache for Emotion
const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider value={clientSideEmotionCache}>
        {/* Theme will still be overridden by layout.tsx via ThemeProvider */}
        <ThemeProvider theme={getTheme("spark")}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
