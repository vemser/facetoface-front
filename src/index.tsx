import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";
import { Box } from "@mui/system";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={LightTheme}>
      <Box
        width="100vw"
        height="100vh"
        bgcolor={LightTheme.palette.background.default}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
