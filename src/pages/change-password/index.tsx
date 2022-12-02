import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../shared/contexts";

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>();
  const { changePassword } = useChangePassword();

  const handleSubmitChange = (data: IChangePassword) => {
    changePassword(data);
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
        <Typography>Mudar a senha!</Typography>
        <TextField
          id="input-password-actual-change-password"
          label="Senha atual..."
          sx={{ width: "100%" }}
          {...register("oldPassword")}
        />
        <TextField
          id="input-password-new-change-password"
          label="Senha nova..."
          sx={{ width: "100%" }}
          {...register("newPassword")}
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
