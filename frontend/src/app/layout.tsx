"use client";
import "@/app/globals.css";
import Providers from "../components/Providers";
import React, { useState, createContext, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Kanit } from "next/font/google";

const dm_serif_text = Kanit({
  subsets: ["latin"],
  weight: "400"
});

export const ThemeModeContext = createContext<{
  mode: "spark" | "nebula";
  toggleMode: (newMode: "spark" | "nebula") => void;
}>({
  mode: "spark",
  toggleMode: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"spark" | "nebula">("spark");

  const toggleMode = (newMode: "spark" | "nebula") => {
    setMode(newMode);
  };

  const theme = createTheme({
    palette: {
      mode: mode === "spark" ? "light" : "dark",
      primary: { main: mode === "spark" ? "#ff9800" : "#9c27b0" },
    },
    typography: { fontFamily: dm_serif_text.style.fontFamily },
  });

  return (
    <html lang="en" className={dm_serif_text.className} data-theme={mode}>
      <body>
        <Providers>
          <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="sticky" color="primary">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Convergic</Typography>
                  <Box>
                    <Button color="inherit" onClick={() => toggleMode("spark")}>Spark</Button>
                    <Button color="inherit" onClick={() => toggleMode("nebula")}>Nebula</Button>
                  </Box>
                </Toolbar>
              </AppBar>
              <Box component="main">{children}</Box>
              <Box component="footer" sx={{ textAlign: "center", py: 4 }}>
                © {new Date().getFullYear()} Convergic. All rights reserved.
              </Box>
            </ThemeProvider>
          </ThemeModeContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
