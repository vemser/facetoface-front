import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInterview } from "../../shared/contexts";

export const DetailInterview: React.FC = () => {
  const { deletarEntrevista } = useInterview();
  const { state } = useLocation();
  const navigate = useNavigate();

  let date = new Date(state.dataEntrevista);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Box
        display="flex"
        padding="3rem 5rem"
        flexDirection="column"
        bgcolor="#fff"
        gap="1rem"
        borderRadius="10px"
      >
        <Typography>
          <span style={{ fontWeight: "bold" }}>Candidato: </span>
          {state.candidatoDTO.nomeCompleto}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {state.candidatoDTO.email}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Trilha: </span>
          {state.candidatoDTO.trilha.nome}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Cidade: </span>
          {state.candidatoDTO.cidade} - {state.candidatoDTO.estado}
        </Typography>
        <hr />
        <Typography>
          <span style={{ fontWeight: "bold" }}>Entrevistador: </span>
          {state.usuarioDTO.nomeCompleto}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {state.usuarioDTO.email}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Data: </span>
          {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Observacoes: </span>
          {state.observacoes}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>status: </span>
          {state.legenda}
        </Typography>
        <hr />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => navigate("/schedule")}>Voltar</Button>
          <Button onClick={() => deletarEntrevista(state.idEntrevista)}>
            Cancelar
          </Button>
          <Button
            onClick={() => navigate("/update-interview", { state: state })}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
