import React, { useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth, useInterview } from "../../shared/contexts";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Schedule: React.FC = () => {
  const { getByMonthYear, schedules, schedulesFormated, getInterview, lista } =
    useInterview();
  const { isAdmin } = useAuth();
  const [dataAtual, setDataAtual] = useState<Date | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let date = new Date();
    getByMonthYear(date.getMonth() + 1, date.getFullYear());
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
            events={schedulesFormated}
            datesSet={(arg) => {
              let date = new Date(arg.startStr);
              setDataAtual(date);
              getByMonthYear(date.getMonth() + 2, date.getFullYear());
            }}
            locale="pt-br"
            buttonText={{ today: "Hoje" }}
            eventClick={(info) => {
              navigate("/update-interview", {
                state: info.event.extendedProps.state,
              });
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
        <Box width="45%" display="flex" flexDirection="column" gap="1rem">
          <Typography>Editar Calenário</Typography>
          {!isAdmin && (
            <Button onClick={() => navigate("/register-interview")}>
              Cadastrar Nova Entrevista
            </Button>
          )}

          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            onClick={() => {
              if (dataAtual)
                getByMonthYear(
                  dataAtual.getMonth() + 2,
                  dataAtual.getFullYear()
                );
            }}
          >
            Atualizar Agenda
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
