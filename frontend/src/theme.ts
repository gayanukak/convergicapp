import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9c27b0" }, // default nebula
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
});

export default theme;
