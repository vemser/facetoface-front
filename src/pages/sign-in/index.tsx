import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../shared/components";
import { useAuth } from "../../shared/contexts";

//schema user signIn
const schema = object({
  email: string().email("E-mail inválido!").required("E-mail é obrigatório!"),
  senha: string().required("Senha é obrigatório!"),
}).required();

//interface user signIn
interface IUser {
  email: string;
  senha: string;
}

export const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(schema) });
  const { handleSignIn } = useAuth();

  const userWatcher = watch("email");
  const passwordWatcher = watch("senha");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const trySignIn = (data: IUser) => {
    handleSignIn(data);
  };

  return (
    <Box
      id="container-sign-in"
      display="flex"
      width="100%"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img
        id="logo-vem-ser-blue-sign-in"
        src={require("../../shared/assets/logo/vem-ser-blue.png")}
        alt="logo vem ser"
        style={{ width: "200px", marginBottom: "1rem" }}
      />
      <Box
        id="form-inputs-sign-in"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Divider sx={{ width: "100%", mb: 1 }} />
        <Box display="flex" flexDirection="column">
          <Box
            id="field2-input-user-sign-in"
            display="flex"
            alignItems="center"
          >
            <PersonIcon
              id="icon-input-user-sign-in"
              sx={{ fontSize: 35, mr: 2 }}
              color={userWatcher ? "primary" : "secondary"}
            />
            <TextField
              id="input-user-sign-in"
              sx={{ width: 250 }}
              label="E-mail"
              variant="outlined"
              type="text"
              {...register("email")}
              error={errors.email && true}
              focused={userWatcher ? true : false}
            />
          </Box>
          <ErrorMessage id="errors-user-sign-in" width="auto" marginLeft="auto">
            {errors.email?.message}
          </ErrorMessage>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box
            id="field2-input-password-sign-in"
            display="flex"
            alignItems="center"
          >
            <LockIcon
              id="icon-input-password-sign-in"
              sx={{ fontSize: 35, mr: 2 }}
              color={passwordWatcher ? "primary" : "secondary"}
            />
            <TextField
              id="input-password-sign-in"
              sx={{ width: 250 }}
              label="Senha"
              variant="outlined"
              color="primary"
              type={showPassword ? "text" : "password"}
              {...register("senha")}
              error={errors.senha && true}
              focused={passwordWatcher ? true : false}
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
          </Box>
          <ErrorMessage
            id="errors-password-sign-in"
            width="auto"
            marginLeft="auto"
          >
            {errors.senha?.message}
          </ErrorMessage>
        </Box>
        <Button
          id="button-sign-in"
          variant="contained"
          color="primary"
          sx={{ paddingInline: 4, borderRadius: 100 }}
          onClick={handleSubmit(trySignIn)}
        >
          Entrar
        </Button>
        <Divider sx={{ width: "100%" }} />
        <Link
          id="link-to-recover-password-sign-in"
          to="/recover-password"
          style={{ textDecoration: "none", color: "#222" }}
        >
          Esqueci minha senha!
        </Link>
      </Box>
    </Box>
  );
};
