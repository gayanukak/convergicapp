import { createTheme, ThemeOptions } from "@mui/material/styles";

// Base options shared by all modes
const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: "'Kanit', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          "&:hover": {
            opacity: 0.85,
          },
        },
      },
    },
  },
};

// Theme definitions for Spark (light) and Nebula (dark)
const themes = {
  spark: createTheme({
    ...baseOptions,
    palette: {
      mode: "light",
      primary: { main: "#ff9800" }, // orange
      secondary: { main: "#fb8c00" },
      background: {
        default: "#ffffff",
        paper: "#f9f9f9",
      },
      text: {
        primary: "#171717",
        secondary: "#444444",
      },
    },
  }),
  nebula: createTheme({
    ...baseOptions,
    palette: {
      mode: "dark",
      primary: { main: "#9c27b0" }, // purple
      secondary: { main: "#b084cc" },
      background: {
        default: "#0a0a0a",
        paper: "#1f1524",
      },
      text: {
        primary: "#ededed",
        secondary: "#cbb6d9",
      },
    },
  }),
};

// Utility to get theme by mode
export const getTheme = (mode: "spark" | "nebula") => themes[mode];

export default themes.nebula; // default export (Nebula)
