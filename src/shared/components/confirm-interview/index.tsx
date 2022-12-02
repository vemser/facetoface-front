import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInterview } from "../../contexts";

export const ConfirmInterview: React.FC = () => {
  const { confirmInterview } = useInterview();
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = search.split("=")[1];

  useEffect(() => {
    if (token) {
      localStorage.setItem("ConfirmInterview", token);
      confirmInterview(token);
      navigate("/");
    }
  }, [token]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bgcolor="#1e62fe"
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={require("../../assets/logo/vem-ser-white.png")}
        style={{ width: "50%" }}
      />
    </Box>
  );
};
