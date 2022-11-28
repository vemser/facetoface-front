import React from "react";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProps {
  time: string;
  name: string;
}

export const ItemCalendar: React.FC<IProps> = ({ time, name }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxWidth="100%"
      sx={{
        padding: "0.1rem 0.4rem",
      }}
    >
      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: `${mdDown ? "8px" : "12px"}`,
        }}
      >
        {time} - {name}
      </Typography>
    </Box>
  );
};
