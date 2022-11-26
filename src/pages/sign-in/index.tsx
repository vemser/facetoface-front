import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
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
import { Header } from "../../shared/components/header";

//schema user signIn
const schema = object({
  user: string().required("Campo obrigatório!"),
  password: string().required("Campo obrigatório!"),
}).required();

//interface user signIn
interface IUser {
  user: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(schema) });

  const userWatcher = watch("user");
  const passwordWatcher = watch("password");

  const handleSignIn = (data: IUser) => {
    //integrar com o backEnd
    console.log(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      id="container-sign-in"
      display="flex"
      width="100%"
      height="100%"
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
        <Box id="field2-input-user-sign-in" display="flex" alignItems="center">
          <PersonIcon
            id="icon-input-user-sign-in"
            sx={{ fontSize: 35, mr: 2 }}
            color={userWatcher ? "primary" : "secondary"}
          />
          <TextField
            id="input-user-sign-in"
            sx={{ width: 250 }}
            label="Usuário"
            variant="outlined"
            type="text"
            {...register("user")}
            error={errors.user && true}
          />
        </Box>
        <Typography
          id="error-input-user-sign-in"
          variant="subtitle1"
          color="red"
          sx={{ ml: "auto" }}
        >
          {errors.user?.message}
        </Typography>
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
            label="Usuário"
            variant="outlined"
            color="primary"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors.password && true}
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
        <Typography
          id="error-input-password-sign-in"
          variant="subtitle1"
          color="red"
          sx={{ ml: "auto" }}
        >
          {errors.password?.message}
        </Typography>
        <Button
          id="button-sign-in"
          variant="contained"
          color="primary"
          sx={{ paddingInline: 4, borderRadius: 100 }}
          onClick={handleSubmit(handleSignIn)}
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
