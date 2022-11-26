import React from "react";
import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Header: React.FC = () => {
  const matches = useMediaQuery(`(min-width:1200px)`);

  return (
    <Box
      width="100%"
      height="100px"
      display="flex"
      justifyContent="center"
      boxShadow={2}
      position="fixed"
      top="0"
      zIndex="999"
    >
      <Box
        display="flex"
        width="100%"
        maxWidth="1300px"
        justifyContent="space-between"
        padding="1rem"
        alignItems="center"
      >
        <img
          id="logo-vem-ser-blue-sign-in"
          src={require("../../assets/logo/vem-ser-blue.png")}
          alt="logo vem ser"
          style={{ height: "30px" }}
        />
        <Box display="flex" justifyContent="center">
          <Button variant="text">Cadastro de candidato</Button>
          <Button variant="text">Cadastro de colaborador</Button>
          <Button variant="text">Cadastro de entrevistas</Button>
          <Button variant="text">Agenda de entrevistas</Button>
        </Box>
        <Box display="flex" gap="1rem">
          <Button variant="outlined" startIcon={<ExitToAppIcon />}>
            Sair
          </Button>
          <Avatar alt="Remy Sharp" src={"../../assets/avatar.png"} />
        </Box>
      </Box>
    </Box>
  );
};
