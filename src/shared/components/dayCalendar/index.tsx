import React, { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

interface IProps {
  days: number;
  date: Date;
  dayWeek: number;
}

interface IDays {
  days: number;
  thisMonth: boolean;
}

export const DayCalendar: React.FC<IProps> = ({ days, date, dayWeek }) => {
  const theme = useTheme();
  const [arrDays, setArrDays] = useState<IDays[]>([]);

  const renderDays = () => {
    let arr = [];
    for (let i = 1; i <= 35; i++) {
      if (i > dayWeek) {
        if (i > days) {
          arr.push({ days: i - days, thisMonth: false });
        } else arr.push({ days: i - dayWeek, thisMonth: true });
      } else arr.push({ days: i - days, thisMonth: false });
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
          width="90%"
          textAlign="center"
          justifyContent="space-between"
        >
          <Typography sx={{ width: "13%" }}>Dom</Typography>
          <Typography sx={{ width: "13%" }}>Seg</Typography>
          <Typography sx={{ width: "13%" }}>Ter</Typography>
          <Typography sx={{ width: "13%" }}>Qua</Typography>
          <Typography sx={{ width: "13%" }}>Qui</Typography>
          <Typography sx={{ width: "13%" }}>Sex</Typography>
          <Typography sx={{ width: "13%" }}>Sab</Typography>
        </Box>
        <Box
          display="flex"
          width="90%"
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {arrDays.map((item, index) => {
            return (
              <Box key={index} minWidth="13%">
                <Box
                  display={item.thisMonth ? "flex" : "none"}
                  bgcolor="white"
                  sx={{
                    border: "1px solid black",
                    mb: "1rem",
                    paddingBottom: "50%",
                  }}
                >
                  <Typography>{item.days}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
