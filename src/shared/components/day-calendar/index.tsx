import React, { useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ItemDay } from "../item-day";
import { useInterview } from "../../contexts";
import { isSameDay, getDay } from "date-fns";

interface IProps {
  days: number;
  date: Date;
  dayWeek: number;
}

interface ISchedules {
  dia: number;
  time: string;
  name: string;
}
interface IDays {
  days: number;
  thisMonth: boolean;
  schedules: ISchedules[];
}

export const DayCalendar: React.FC<IProps> = ({ days, date, dayWeek }) => {
  const { schedules } = useInterview();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [arrDays, setArrDays] = useState<IDays[]>([]);
  const [arrSchedules, setArrSchedules] = useState<any>([]);

  const pegarDia = () => {
    let arr: any = [];

    schedules.elementos.map((item: any) => {
      let dia: any = new Date(item.dataEntrevista).toLocaleDateString();
      dia = dia.split("/");
      let horario: any = item.dataEntrevista.split("T");
      arr.push({
        dia: parseInt(dia[0]) + 1,
        time: `${horario[1][0]}${horario[1][1]}:${horario[1][3]}${horario[1][4]}`,
        name: item.candidatoDTO.nomeCompleto,
      });
    });
    setArrSchedules(arr);
    salvarDias(arr);
  };

  const salvarDias = (arrSchedulesTest: any) => {
    let arr = arrDays;
    for (let i = 0; i < 35; i++) {
      for (let j = 0; j < arrSchedules.length; j++) {
        let aux = arrSchedulesTest.filter((item: any) => item.dia === i);
        if (aux.length > 0) {
          arr[i].schedules = aux;
        }
      }
    }
    setArrDays(arr);
  };

  const renderDays = () => {
    var arr: IDays[] = [];
    for (let i = 1; i <= 35; i++) {
      if (i > dayWeek) {
        if (i > days + dayWeek) {
          arr.push({ days: i - days, thisMonth: false, schedules: [] });
        } else {
          arr.push({
            days: i - dayWeek,
            thisMonth: true,
            schedules: [],
          });
        }
      } else arr.push({ days: i - days, thisMonth: false, schedules: [] });
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
      {schedules && <Button onClick={pegarDia}>test</Button>}
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
