import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUserComplete } from "../../interfaces";

interface IProps {
  props: IUserComplete;
  onDelete?: any;
  onUpdate?: any;
}

export const ItemUser: React.FC<IProps> = ({ props, onDelete, onUpdate }) => {
  const styleColumns = {
    width: "14%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

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
        sx={{
          width: "8%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize="15px">{props.idUsuario}</Typography>
      </Box>
      <Box sx={styleColumns}>
        <Typography fontSize="15px">{props.nomeCompleto}</Typography>
      </Box>
      <Box
        sx={{
          width: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography fontSize="15px">{props.email}</Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize="15px">{props.trilha.nome}</Typography>
      </Box>
      <Box sx={styleColumns}>
        <Typography fontSize="15px">{props.genero}</Typography>
      </Box>
      <Box sx={styleColumns}>
        <Button
          variant="contained"
          sx={{ borderRadius: "100px", fontSize: "12px" }}
        >
          Entrevista
        </Button>
      </Box>
      <Box sx={styleColumns}>
        <IconButton onClick={onUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
