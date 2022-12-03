import React, { useState } from "react";
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

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>({ resolver: yupResolver(SenhaForteSchema) });
  const { changePassword } = useChangePassword();

  const handleSubmitChange = (data: IChangePassword) => {
    changePassword(data);
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
          {...register("oldPassword")}
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
          {errors.oldPassword?.message}
        </ErrorMessage>
        <TextField
          id="input-password-new-change-password"
          label="Senha nova..."
          sx={{ width: "100%" }}
          {...register("newPassword")}
          type={showPassword ? "text" : "password"}
        />
        <ErrorMessage id="error-new-password-change-password" width="100%">
          {errors.newPassword?.message}
        </ErrorMessage>
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
