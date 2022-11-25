import React from "react";
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

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/register-candidate" element={<RegisterCandidate />} />
      <Route path="/register-interview" element={<RegisterInterview />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
