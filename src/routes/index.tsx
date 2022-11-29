import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
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
import { UpdateUser } from "../pages/update-user";
import { RouteAdmin, SideBar } from "../shared/components";
import { useAuth } from "../shared/contexts";

export const AppRoutes: React.FC = () => {
  const { token } = useAuth();

  if (!token)
    return (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
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
            <Route element={<RouteAdmin />}>
              <Route path="/register-user" element={<RegisterUser />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/register-candidate" element={<RegisterCandidate />} />
            <Route path="/update-candidate/:id" element={<UpdateCandidate />} />
            <Route path="/register-interview" element={<RegisterInterview />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SideBar>
      </>
    );
  }
};
