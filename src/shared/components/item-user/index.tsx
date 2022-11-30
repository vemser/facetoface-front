import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUserComplete } from "../../interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProps {
  props: IUserComplete;
  onDelete?: any;
  onUpdate?: any;
}

export const ItemUser: React.FC<IProps> = ({ props, onDelete, onUpdate }) => {
  const firtsBreakpoint = useMediaQuery("(max-width:1100px)");
  const secondBreakpoint = useMediaQuery("(max-width:800px)");

  let name = props.nomeCompleto.split(" ");

  let admin = props.perfis.find((item: any) => item.nome === "ROLE_ADMIN");
  let gestao = props.perfis.find((item: any) => item.nome === "ROLE_GESTAO");
  let instrutor = props.perfis.find(
    (item: any) => item.nome === "ROLE_INSTRUTOR"
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      textAlign="center"
      sx={{ borderBottom: "1px solid #bdbdbd", padding: "0.5rem 0" }}
    >
      <Typography fontSize={firtsBreakpoint ? "12px" : "15px"} width="5%">
        {props.idUsuario}
      </Typography>

      <Typography fontSize={firtsBreakpoint ? "12px" : "15px"} width="25%">
        {name[0]} {name[1]}...
      </Typography>

      <Typography
        fontSize={firtsBreakpoint ? "12px" : "15px"}
        width="25%"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.email}
      </Typography>

      {!secondBreakpoint && (
        <Typography fontSize={firtsBreakpoint ? "12px" : "15px"} width="15%">
          {props.genero}
        </Typography>
      )}

      <Typography fontSize={firtsBreakpoint ? "11px" : "14px"} width="19%">
        {admin && " (Admin) "}
        {gestao && " (Gestão) "}
        {instrutor && " (Intrutor) "}
      </Typography>

      <Box width="11%" display="flex" justifyContent="center">
        <IconButton onClick={onUpdate}>
          <EditIcon
            sx={{
              fontSize: `${firtsBreakpoint ? "18px" : "25px"}`,
            }}
          />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon
            sx={{
              fontSize: `${firtsBreakpoint ? "18px" : "25px"}`,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
