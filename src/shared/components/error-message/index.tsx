import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  id: string;
  children: React.ReactNode;
  width: string;
}

export const ErrorMessage: React.FC<IProps> = ({ id, children, width }) => {
  return (
    <Typography id={id} sx={{ width: width }} variant="subtitle1" color="red">
      {children}
    </Typography>
  );
};
