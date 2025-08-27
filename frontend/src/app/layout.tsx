"use client";

import "@/app/globals.css";
import Providers from "../components/Providers";
import React, { useState, createContext, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Kanit } from "next/font/google";

// Load Google font "Kanit"
const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

// Context for theme mode switching (spark = light, nebula = dark)
export const ThemeModeContext = createContext<{
  mode: "spark" | "nebula";
  toggleMode: (newMode: "spark" | "nebula") => void;
}>({
  mode: "spark",
  toggleMode: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"spark" | "nebula">("spark");

  // Function to toggle between spark and nebula modes
  const toggleMode = (newMode: "spark" | "nebula") => {
    setMode(newMode);
  };

  // Create Material UI theme based on selected mode
  const theme = createTheme({
    palette: {
      mode: mode === "spark" ? "light" : "dark",
      primary: {
        main: mode === "spark" ? "#ff9800" : "#7b3fbb", // orange for spark, purple for nebula
      },
    },
    typography: {
      fontFamily: kanit.style.fontFamily,
    },
  });

  return (
    <html lang="en" className={kanit.className} data-theme={mode}>
      <body>
        <Providers>
          <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              {/* Header / AppBar with toggle buttons */}
              <AppBar position="sticky" color="primary" enableColorOnDark>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Convergic</Typography>
                  <Box>
                    <Button color="inherit" onClick={() => toggleMode("spark")}>
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
                  color: "primary.contrastText", // ensures readable text
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
