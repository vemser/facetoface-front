import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ItemCandidate: React.FC = (props: any) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      p={1}
      sx={{ borderBottom: "1px solid #bdbdbd" }}
    >
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="15px">{props.notaProva}</Typography>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="15px">{props.nomeCompleto}</Typography>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="15px">{props.email}</Typography>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="15px">{props.trilha.nome}</Typography>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="15px">{props.genero}</Typography>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          sx={{ borderRadius: "100px", fontSize: "12px" }}
        >
          Entrevista
        </Button>
      </Box>
      <Box
        width="14%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
