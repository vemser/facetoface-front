import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCandidate } from "../../shared/contexts";

export const DetailCandidate: React.FC = () => {
  const { getCandidateImage, getCurriculo } = useCandidate();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [curriculoGet, setCurriculoGet] = useState(null);
  const [imageUser, setImageUser] = useState<string | null>(null);

  // Nome da página
  useEffect(() => {
    getCandidateImage(state.email).then((response) => setImageUser(response));
    getCurriculo(state.email).then((response) => setCurriculoGet(response));
  }, []);

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
        flexDirection="column"
        alignItems="center"
        bgcolor="#fff"
        borderRadius="10px"
        width="70%"
        padding=" 30px 0"
      >
        <Avatar
          id="avatar-register-candidate"
          alt="Foto perfil"
          src={imageUser ? `data:image/png;base64,${imageUser}` : ""}
          sx={{ width: 80, height: 80, m: "auto" }}
        />
        <Box 
        display="flex"
        gap={10}
        margin="40px"
        >
        <Box
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

        </Box>
        <Box>
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
        </Box>
        </Box>
        
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/")}>Voltar</Button>
          {curriculoGet && (
            <a
              download="file.pdf"
              href={"data:application/octet-stream;base64," + curriculoGet}
              title="Download Curriculo"
            >
              <Button variant="outlined" sx={{ width: "100%" }}>
                Baixar CV
              </Button>
            </a>
          )}
          <Button
          variant="outlined"
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
