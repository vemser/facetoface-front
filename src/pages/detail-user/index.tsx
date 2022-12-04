import {
  Avatar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../shared/contexts/userContext";

export const DetailUser: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [imageUser, setImageUser] = useState<string | null>(null);
  const { getUserImage } = useUser();

  //Medias Query
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  // Nome da página
  useEffect(() => {
    getUserImage(state.email).then((response) => setImageUser(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      padding="1rem 0"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
        borderRadius="10px"
        padding=" 30px 1.5rem"
      >
        <Avatar
          id="avatar-register-candidate"
          alt="Foto perfil"
          src={imageUser ? `data:image/png;base64,${imageUser}` : ""}
          sx={{ width: 80, height: 80, m: "auto" }}
        />
        <Box display="flex" flexDirection={"column"} gap="1rem" mt={2} mb={2}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Nome: </span>
            {state.nomeCompleto}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Email: </span>
            {state.email}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Cidade: </span>
            {state.cidade} - {state.estado}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>genero: </span>
            {state.genero}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={mdDown ? 1 : 2}
        >
          <Button variant="outlined" onClick={() => navigate("/")}>
            Voltar
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              navigate("/update-user/" + state.idUsuario, {
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
