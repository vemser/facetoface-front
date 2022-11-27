import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  RecoverPassword,
  RegisterCandidate,
  RegisterInterview,
  RegisterUser,
  Schedule,
  SignIn,
} from "../pages";
import { SideBar } from "../shared/components";

export const AppRoutes: React.FC = () => {
  const [signIn, setSignIn] = useState<boolean>(true);

  if (!signIn)
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    );
  else {
    return (
      <>
        <SideBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/register-candidate" element={<RegisterCandidate />} />
            <Route path="/register-interview" element={<RegisterInterview />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SideBar>
      </>
    );
  }
};
