import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";
import { Box } from "@mui/system";
import "./global.css";
import {
  AuthProvider,
  CandidateProvider,
  InterviewProvider,
  SideBarProvider,
} from "./shared/contexts";
import { UserProvider } from "./shared/contexts/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={LightTheme}>
        <AuthProvider>
          <SideBarProvider>
            <CandidateProvider>
              <UserProvider>
                <InterviewProvider>
                  <Box
                    minHeight="100vh"
                    bgcolor={LightTheme.palette.background.default}
                  >
                    <AppRoutes />
                  </Box>
                </InterviewProvider>
              </UserProvider>
            </CandidateProvider>
          </SideBarProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
