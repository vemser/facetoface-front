import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChangePassword } from "../../contexts";

export const RecoverPasswordToken: React.FC = () => {
  const { postToken } = useChangePassword();
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = search.split("=")[1];

  useEffect(() => {
    if (token) {
      localStorage.setItem("RecoverPassword", token);
      postToken(token);
      navigate("/");
    }
  }, [token]);

  return <Box width="100vw" height="100vh"></Box>;
};
