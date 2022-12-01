import React, { useEffect } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useInterview } from "../../shared/contexts";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./index.css";

export const Schedule: React.FC = () => {
  const { getByMonthYear, schedules } = useInterview();
  const { getInterview, lista } = useInterview();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getByMonthYear(11, 2022);
  }, []);

  return (
    <Box
      width="90%"
      minHeight="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt="3%"
      margin="0 auto"
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="2rem "
      >
        <Typography
          color="primary"
          variant="h3"
          fontSize={mdDown ? "1.5rem" : "3rem"}
          textAlign="center"
        >
          Agenda de Entrevistas
        </Typography>
      </Box>

      <Box width="100%">
        <Box width="100%" sx={{ paddingBottom: "5%" }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
              { title: "event 1", date: "2022-12-30T16:42:56.52" },
              { title: "event 2", date: "2022-12-02" },
            ]}
            datesSet={(arg) => {
              let date = new Date(arg.startStr);
              getByMonthYear(date.getMonth() + 1, date.getFullYear());
            }}
          />
        </Box>
      </Box>

      <Box width="100%" display="flex" justifyContent="space-evenly" mb="5%">
        <Box width="45%" display="flex" flexDirection="column">
          <Typography>Legenda</Typography>
          <Box width="100%" display="flex" mt="1rem">
            <Box width="50px" height="100%" bgcolor="green"></Box>
            <Typography pl="1rem">Confirmada</Typography>
          </Box>
          <Box width="100%" display="flex" mt="1rem">
            <Box width="50px" height="100%" bgcolor="yellow"></Box>
            <Typography pl="1rem">Pendente</Typography>
          </Box>
          <Box width="100%" display="flex" mt="1rem">
            <Box width="50px" height="100%" bgcolor="red"></Box>
            <Typography pl="1rem">Cancelada</Typography>
          </Box>
          <Box width="100%" display="flex" mt="1rem">
            <Box width="50px" height="100%" bgcolor="gray"></Box>
            <Typography pl="1rem">Outro</Typography>
          </Box>
        </Box>
        <Box width="45%" display="flex" flexDirection="column">
          <Typography>Editar Calenário</Typography>
          <Button>Cadastrar Nova Entrevista</Button>
          <Button>Atualizar Agenda</Button>
        </Box>
      </Box>
    </Box>
  );
};
