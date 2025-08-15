import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8e44ad" }, // rich modern purple
    secondary: { main: "#b084cc" }, // softer complementary purple
    background: {
      default: "#140d17", // deep purple-black
      paper: "#1f1524", // slightly lighter purple surface
    },
    text: {
      primary: "#f5f0fa", // clean off-white
      secondary: "#cbb6d9", // muted purple-gray
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h3: { fontWeight: 700, color: "#8e44ad" },
    body1: { lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          backgroundColor: "#8e44ad",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#732d91",
          },
        },
      },
    },
  },
});

export default theme;
