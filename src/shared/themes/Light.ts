import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#1e62fe",
      dark: "#1A53D6",
      light: "#008DFA",
      contrastText: "#F9F8FF",
    },
    secondary: {
      main: "#31363B",
      dark: "#31363B",
      light: "#31363B",
      contrastText: "#F9F8FF",
    },
    background: {
      default: "#F9F8FF",
      paper: "#ffffff",
    },
  },
});
