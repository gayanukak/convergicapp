"use client";

import "@/app/globals.css";
import Providers from "../components/Providers";
import React, { useState, createContext } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Kanit } from "next/font/google";
import { getTheme } from "@/theme";

// Load Google font "Kanit"
const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

// Context for theme mode switching
export const ThemeModeContext = createContext<{
  mode: "spark" | "nebula";
  toggleMode: (newMode: "spark" | "nebula") => void;
}>({
  mode: "spark",
  toggleMode: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"spark" | "nebula">("spark");

  // Toggle between Spark and Nebula
  const toggleMode = (newMode: "spark" | "nebula") => {
    setMode(newMode);
  };

  return (
    <html lang="en" className={kanit.className} data-theme={mode}>
      <body>
        <Providers>
          <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={getTheme(mode)}>
              <CssBaseline />

              {/* Header */}
              <AppBar position="sticky" color="primary" enableColorOnDark>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Convergic</Typography>
                  <Box>
                    <Button
                      color="inherit"
                      onClick={() => toggleMode("spark")}
                      sx={{ mr: 1 }}
                    >
                      Spark
                    </Button>
                    <Button color="inherit" onClick={() => toggleMode("nebula")}>
                      Nebula
                    </Button>
                  </Box>
                </Toolbar>
              </AppBar>

              {/* Main content */}
              <Box component="main">{children}</Box>

              {/* Footer */}
              <Box
                component="footer"
                sx={{
                  textAlign: "center",
                  py: 4,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                © {new Date().getFullYear()} Convergic. All rights reserved.
              </Box>
            </ThemeProvider>
          </ThemeModeContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
