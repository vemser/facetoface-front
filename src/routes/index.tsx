import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChangePassword,
  DetailInterview,
  Home,
  RecoverPassword,
  RegisterCandidate,
  RegisterInterview,
  RegisterUser,
  Schedule,
  SignIn,
  UpdateCandidate,
  UpdateUser,
} from "../pages";
import { ConfirmInterview, SideBar } from "../shared/components";
import { useAuth } from "../shared/contexts";
import "nprogress/nprogress.css";
import { UpdateInterview } from "../pages/update-interview";
import { RecoverPasswordToken } from "../shared/components/recover-password";

export const AppRoutes: React.FC = () => {
  const { token } = useAuth();

  if (!token)
    return (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route
            path="/recover-password-token"
            element={<RecoverPasswordToken />}
          />
          <Route path="/confirm-interview" element={<ConfirmInterview />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  else {
    return (
      <>
        <SideBar>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/register-candidate" element={<RegisterCandidate />} />
            <Route path="/update-candidate/:id" element={<UpdateCandidate />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/register-interview" element={<RegisterInterview />} />
            <Route path="/update-interview" element={<UpdateInterview />} />
            <Route path="/detail-interview" element={<DetailInterview />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/confirm-interview" element={<ConfirmInterview />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SideBar>
      </>
    );
  }
};
