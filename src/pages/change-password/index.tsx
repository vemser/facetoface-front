import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../shared/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { SenhaForteSchema } from "../../shared/schemas";
import { ErrorMessage } from "../../shared/components";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import nProgress from "nprogress";
import alertError from "../../shared/alerts/error";
import alertSuccess from "../../shared/alerts/sucess";

interface IChangePassword {
  senhaAtual: string;
  senhaNova: string;
}

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>({ resolver: yupResolver(SenhaForteSchema) });
  const { changePassword } = useChangePassword();

  const [senhaConf, setSenhaConf] = useState("");

  const handleSubmitChange = (data: IChangePassword) => {
    console.log(data);
    if (data.senhaNova === senhaConf) {
      changePassword(data);
      //alertSuccess("Senha alterada com sucesso");
    } else {
      alertError("As senhas precisam ser iguais");
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        textAlign="center"
        padding="5rem"
        bgcolor="#fff"
        borderRadius="20px"
        alignItems="center"
      >
        <img
          src={require("../../shared/assets/logo/vem-ser-blue.png")}
          alt="logo faceToface"
          style={{ width: "200px" }}
        />
        <Typography>Alterar senha!</Typography>
        <TextField
          id="input-password-actual-change-password"
          label="Senha atual..."
          sx={{ width: "100%" }}
          {...register("senhaAtual")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ErrorMessage id="error-actual-password-change-password" width="100%">
          {errors.senhaAtual?.message}
        </ErrorMessage>
        <TextField
          id="input-password-new-change-password"
          label="Senha nova..."
          sx={{ width: "100%" }}
          {...register("senhaNova")}
          type={showPassword ? "text" : "password"}
        />
        <ErrorMessage id="error-actual-password-change-password" width="100%">
          {errors.senhaNova?.message}
        </ErrorMessage>
        <TextField
          id="input-password-new-change-confirm-password"
          label="Confimar senha"
          sx={{ width: "100%" }}
          onChange={(e) => setSenhaConf(e.target.value)}
          type={showPassword ? "text" : "password"}
        />

        <Button
          onClick={handleSubmit(handleSubmitChange)}
          variant="contained"
          sx={{ borderRadius: "100px" }}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
