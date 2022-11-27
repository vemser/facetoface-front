import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getDaysInMonth } from "date-fns";
import React, { useState } from "react";
import { DayCalendar } from "../dayCalendar";

export const Calendar: React.FC = () => {
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [days, setDays] = useState<number>(
    getDaysInMonth(new Date(dateNow.toISOString()))
  );

  const toggleMonth = (action: number) => {
    let aux = new Date(dateNow.toISOString());
    aux.setMonth(aux.getMonth() + action);
    setDateNow(new Date(aux.toISOString()));
    setDays(getDaysInMonth(new Date(dateNow.toISOString())));
  };

  return (
    <Box
      width="100%"
      minHeight="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt="1%"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
        pl="6%"
        gap="2rem"
      >
        <Typography variant="h5">Agenda de Entrevistas</Typography>
        <Typography variant="h5" color="primary">
          {dateNow.getMonth()} - {dateNow.getFullYear()}
        </Typography>
      </Box>
      <Box width="100%" display="flex" pt="2rem">
        <DayCalendar days={days} date={dateNow} />
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button onClick={() => toggleMonth(1)}>Avançar</Button>
        <Button onClick={() => toggleMonth(-1)}>Voltar</Button>
      </Box>
      <Box width="100%" display="flex" justifyContent="space-evenly">
        <Box>
          <Typography>Legenda</Typography>
        </Box>
        <Box>
          <Typography>Legenda</Typography>
        </Box>
      </Box>
    </Box>
  );
};
