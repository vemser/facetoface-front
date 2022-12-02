import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { ICandidateComplete } from "../../interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProps {
  props: ICandidateComplete;
  onDelete: any;
  onUpdate: any;
  onInterview: any;
  onDetail: () => void;
}

export const ItemCandidate: React.FC<IProps> = ({
  props,
  onDelete,
  onUpdate,
  onDetail,
  onInterview,
}) => {
  const firtsBreakpoint = useMediaQuery("(max-width:1100px)");
  const secondBreakpoint = useMediaQuery("(max-width:800px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      textAlign="center"
      width="100%"
      justifyContent="space-between"
      sx={{ borderBottom: "1px solid #bdbdbd", padding: ".5rem 0" }}
    >
      <Typography fontSize={firtsBreakpoint ? "12px" : "15px"} width="5%">
        {props.idCandidato}
      </Typography>

      <Typography fontSize={firtsBreakpoint ? "12px" : "15px"} width="20%">
        {props.nomeCompleto}
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
        <Typography fontSize={firtsBreakpoint ? "11px" : "14px"} width="10%">
          {props.trilha.nome}
        </Typography>
      )}

      <Typography width="5%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
        {props.notaProva}
      </Typography>

      <Box width="15%">
        <Button
          variant="contained"
          sx={{
            borderRadius: "100px",
            fontSize: `${firtsBreakpoint ? "9px" : "12px"}`,
          }}
          onClick={onInterview}
        >
          Marcar
        </Button>
      </Box>
      <Box
        width="14%"
        display="flex"
        justifyContent="center"
        flexDirection={secondBreakpoint ? "column" : "row"}
      >
        <IconButton onClick={onDetail}>
          <StickyNote2Icon
            sx={{
              fontSize: `${firtsBreakpoint ? "18px" : "25px"}`,
            }}
          />
        </IconButton>
        <IconButton onClick={onUpdate}>
          <EditIcon
            sx={{
              fontSize: `${firtsBreakpoint ? "18px" : "25px"}`,
            }}
          />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon
            sx={{ fontSize: `${firtsBreakpoint ? "18px" : "25px"}` }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
