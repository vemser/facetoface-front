import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const DetailCandidate: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
          <span style={{ fontWeight: "bold" }}>Nome: </span>
          {state.nomeCompleto}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {state.email}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Trilha: </span>
          {state.trilha.nome}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Cidade: </span>
          {state.cidade} - {state.estado}
        </Typography>
        <hr />
        <Typography>
          <span style={{ fontWeight: "bold" }}>Edição: </span>
          {state.edicao.nome}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Nota da prova: </span>
          {state.notaProva}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>genero: </span>
          {state.genero}
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Observações: </span>
          {state.observacoes ? state.observacoes : "Nenhum observação"}
        </Typography>
        <hr />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => navigate("/")}>Voltar</Button>
          <Button
            onClick={() =>
              navigate("/update-candidate/" + state.idCandidate, {
                state: state,
              })
            }
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
