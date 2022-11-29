import React from "react";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ItemCalendar } from "../item-calendar";
import "./style.css";

interface ISchedules {
  time: string;
  name: string;
}
interface IDays {
  days: number;
  thisMonth: boolean;
  schedules: ISchedules[];
}
export const ItemDay: React.FC<IDays> = ({ thisMonth, days, schedules }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      bgcolor={thisMonth ? "#e2e2e2" : "#e2e2e25a"}
      minWidth="14%"
      maxWidth="14%"
      sx={{ paddingBottom: "1rem", mb: "0.5rem" }}
      className="item"
    >
      <Box
        display={thisMonth ? "flex" : "none"}
        flexDirection="column"
        height={mdDown ? "50px" : "125px"}
        sx={{
          overflow: "hidden",
        }}
      >
        <Typography
          width="100%"
          p="0.2rem 0.5rem"
          fontSize={mdDown ? "10px" : "14px"}
        >
          {days}
        </Typography>
        {schedules &&
          schedules.map((item, index) => {
            return (
              <ItemCalendar key={index} time={item.time} name={item.name} />
            );
          })}
      </Box>
    </Box>
  );
};
