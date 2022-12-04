import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { schemaPassword } from "../../shared/schemas";
import { useChangePassword } from "../../shared/contexts/passwordContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../shared/components";

interface IPasswordProps {
  email: string;
}

export const RecoverPassword: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { postRecoverPassword } = useChangePassword();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordProps>({ resolver: yupResolver(schemaPassword) });

  const handleSolicitaToken = (data: IPasswordProps) => {
    postRecoverPassword(data.email);
  };

  useEffect(() => {
    document.title = `Recuperação de senha`;
  }, []);

  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      {/* box logo */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          id="logo-vem-ser-blue-recover"
          src={require("../../shared/assets/logo/vem-ser-blue.png")}
          alt="logo vem ser"
          style={{ width: "200px", marginBottom: "1rem" }}
        />

        <Typography id="texto-title-recover" variant="h5">
          Recuperação de senha
        </Typography>
      </Box>

      {/* box input email */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="center"
        textAlign="center"
        gap={3}
      >
        <form
          onSubmit={handleSubmit(handleSolicitaToken)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            width={mdDown ? "100%" : "90%"}
            alignItems="center"
            textAlign="center"
            gap={3}
          >
            <Typography
              id="texto-info-recover"
              variant="subtitle1"
              width={mdDown ? "100%" : "40%"}
            >
              Informe abaixo o seu email DBC cadastrado e receba o token para
              validar a troca de senha.
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              width={mdDown ? "100%" : "30%"}
              alignItems="center"
              textAlign="center"
            >
              <TextField
                id="input-email-recover"
                label="E-mail"
                variant="outlined"
                type="text"
                sx={{ width: "90%" }}
                {...register("email")}
              ></TextField>
              <ErrorMessage
                id="error-edition-register-candidate"
                width={"100%"}
              >
                {errors.email?.message}
              </ErrorMessage>
            </Box>

            <Button
              id="button-submit-recover"
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: 200,
                paddingInline: 2,
                borderRadius: 100,
              }}
            >
              Enviar
            </Button>
            <Button
              id="button-back-recover"
              variant="outlined"
              color="primary"
              sx={{
                width: 200,
                paddingInline: 2,
                borderRadius: 100,
              }}
              onClick={() => navigate("/")}
            >
              Voltar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
