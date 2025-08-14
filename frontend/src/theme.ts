import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff7a00" },
    secondary: { main: "#00c7be" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h3: { fontWeight: 700 },
    body1: { lineHeight: 1.6 },
  },
});

export default theme;
