import React from "react";
import { Box, Typography } from "@mui/material";

export const ItemCandidate: React.FC = (props: any) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Typography>{props.nomeCompleto}</Typography>
      <Typography>{props.email}</Typography>
      <Typography>{props.trilha.nome}</Typography>
      <Typography>{props.genero}</Typography>
    </Box>
  );
};
