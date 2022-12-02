import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  id: string;
  children: React.ReactNode;
  width: string;
  marginLeft?: string;
}

export const ErrorMessage: React.FC<IProps> = ({
  id,
  children,
  width,
  marginLeft,
}) => {
  return (
    <Typography
      id={id}
      sx={{ width: width }}
      variant="subtitle1"
      color="error"
      marginLeft={marginLeft ? marginLeft : "0"}
    >
      {children}
    </Typography>
  );
};
