import React, { useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getDaysInMonth, startOfMonth } from "date-fns";
import { DayCalendar } from "../../shared/components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useInterview } from "../../shared/contexts";

export const Schedule: React.FC = () => {
  const { getByMonthYear, schedules } = useInterview();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [days, setDays] = useState<number>(
    getDaysInMonth(new Date(dateNow.toISOString()))
  );
  const [dayWeek, setDayWeek] = useState<number>(
    startOfMonth(new Date(dateNow.toISOString())).getDay()
  );

  const toggleMonth = (action: number) => {
    let aux = new Date(dateNow);
    aux.setMonth(aux.getMonth() + action);
    setDateNow(aux);
    setDays(getDaysInMonth(aux));
    setDayWeek(startOfMonth(aux).getDay());
    getByMonthYear(aux.getMonth() + 1, aux.getFullYear());
  };

  useEffect(() => {
    getByMonthYear(dateNow.getMonth() + 1, dateNow.getFullYear());
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
      <Box width="100%" display="flex" justifyContent="space-evenly">
        {mdDown ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography sx={{ fontSize: "15px" }}>
              {dateNow.getMonth() + 1} - {dateNow.getFullYear()}
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              mt="1rem"
              gap="1rem"
            >
              <Button
                sx={{ borderRadius: "100px", width: "100px" }}
                color="primary"
                variant="outlined"
                onClick={() => toggleMonth(-1)}
              >
                Voltar
              </Button>
              <Button
                sx={{ borderRadius: "100px", width: "100px" }}
                color="primary"
                variant="outlined"
                onClick={() => toggleMonth(1)}
              >
                Avançar
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            width="100%"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button
              sx={{ borderRadius: "100px", width: "200px" }}
              color="primary"
              variant="outlined"
              onClick={() => toggleMonth(-1)}
            >
              Voltar
            </Button>
            <Typography sx={{ fontSize: "18px", textAlign: "center" }}>
              {dateNow.getMonth() + 1} - {dateNow.getFullYear()}
            </Typography>

            <Button
              sx={{ borderRadius: "100px", width: "200px" }}
              color="primary"
              variant="outlined"
              onClick={() => toggleMonth(1)}
            >
              Avançar
            </Button>
          </Box>
        )}
      </Box>
      <Box width="100%" display="flex" pt="2rem">
        {/* <DayCalendar days={days} date={dateNow} dayWeek={dayWeek} /> */}
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
