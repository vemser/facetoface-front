import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
  width: string;
}

export const ErrorMessage: React.FC<IProps> = ({ children, width }) => {
  return (
    <Typography sx={{ width: width }} variant="subtitle1" color="red">
      {children}
    </Typography>
  );
};
