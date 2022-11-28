import React, { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ItemDay } from "../item-day";

interface IProps {
  days: number;
  date: Date;
  dayWeek: number;
}

interface ISchedules {
  time: string;
  name: string;
}
interface IDays {
  days: number;
  thisMonth: boolean;
  schedules: ISchedules[];
}

export const DayCalendar: React.FC<IProps> = ({ days, date, dayWeek }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [arrDays, setArrDays] = useState<IDays[]>([]);

  const renderDays = () => {
    let sche = [
      {
        time: "20:00",
        name: "teste teste teste",
      },
    ];
    var arr: IDays[] = [];
    for (let i = 1; i <= 35; i++) {
      if (i > dayWeek) {
        if (i > days) {
          arr.push({ days: i - days, thisMonth: false, schedules: sche });
        } else
          arr.push({
            days: i - dayWeek,
            thisMonth: true,
            schedules: sche,
          });
      } else arr.push({ days: i - days, thisMonth: false, schedules: sche });
    }

    setArrDays(arr);
  };

  useEffect(() => {
    renderDays();
  }, [days, dayWeek]);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxWidth="100%"
        minWidth="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          display="flex"
          width="100%"
          textAlign="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Dom
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Seg
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Ter
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Qua
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Qui
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Sex
          </Typography>
          <Typography
            sx={{ width: "14%", padding: "0.3rem" }}
            fontSize={mdDown ? "10px" : "14px"}
          >
            Sab
          </Typography>
        </Box>
        <Box
          display="flex"
          width="100%"
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {arrDays.map((item, index) => {
            return (
              <ItemDay
                key={index}
                days={item.days}
                thisMonth={item.thisMonth}
                schedules={item.schedules}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
