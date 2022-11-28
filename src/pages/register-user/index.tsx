import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../shared/schemas/register-user.schema";
import { IUser } from "../../shared/interfaces";
import { ErrorMessage } from "../../shared/components";

export const RegisterUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(schemaUser) });

  const handleSubmitUser = (data: any) => {
    console.log(data);
  };
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    document.title = `Cadastro de usuário`;
  }, []);
  return (
    <Box
      display="flex"
      width="100%"
      minHeight="100%"
      paddingTop={4}
      justifyContent="center"
      alignItems="center"
    >
      <form
        onSubmit={handleSubmit(handleSubmitUser)}
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* ------------- Box 1 ------------------ */}
        <Box
          display="flex"
          flexDirection={mdDown ? "column" : "row"}
          width="100%"
          gap={3}
          alignItems="center"
          mb={3}
        >
          <Avatar
            id="foto-register-candidate"
            alt="foto"
            src=""
            sx={{ width: 100, height: 100 }}
          />
          <TextField
            id="up-foto-register-candidate"
            type="file"
            label="Foto"
            sx={{
              width: "100%",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        {/* ------------- Box 2 ------------------ */}
        <Box
          display="flex"
          flexDirection={mdDown ? "column" : "row"}
          width="100%"
          gap={3}
        >
          {/* ---------------- Col 1 ----------------- */}
          <Box display="flex" width="100%" flexDirection="column" gap={3}>
            <Box>
              <TextField
                id="name-register-user"
                label="Nome completo"
                sx={{ width: "100%" }}
                {...register("name")}
              />
              <ErrorMessage id="error-name-register-user" width="100%">
                {errors.name?.message}
              </ErrorMessage>
            </Box>

            <Box>
              <TextField
                id="cidade-register-user"
                label="Cidade"
                sx={{ width: "100%" }}
                {...register("city")}
              />
              <ErrorMessage id="error-city-register-user" width="100%">
                {errors.city?.message}
              </ErrorMessage>
            </Box>
            <Box sx={{ width: "100%" }}>
              <FormControl>
                <FormLabel id="label-genero-register-candidate">
                  Gênero
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    id="genero-feminino-register-user"
                    value="feminino"
                    control={<Radio />}
                    label="Feminino"
                    {...register("genre")}
                  />
                  <FormControlLabel
                    id="genero-masculino-register-user"
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                    {...register("genre")}
                  />
                </RadioGroup>
              </FormControl>
              <ErrorMessage id="error-genre-register-user" width="100%">
                {errors.genre?.message}
              </ErrorMessage>
            </Box>
          </Box>

          {/* ---------------- Col 2 ----------------- */}
          <Box display="flex" width="100%" flexDirection="column" gap={3}>
            <Box>
              <Box>
                <TextField
                  id="email-register-user"
                  label="Email"
                  sx={{ width: "100%" }}
                  {...register("email")}
                />
                <ErrorMessage id="error-email-register-user" width="100%">
                  {errors.email?.message}
                </ErrorMessage>
              </Box>
            </Box>

            <Box>
              <TextField
                id="estado-register-user"
                label="Estado"
                sx={{ width: "100%" }}
                {...register("state")}
              />
              <ErrorMessage id="error-state-register-user" width="100%">
                {errors.state?.message}
              </ErrorMessage>
            </Box>

            <Box>
              <Box sx={{ width: "100%" }}>
                <FormControl>
                  <FormLabel id="label-tipo-register-user">Tipo</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      id="tipo-gestao-register-user"
                      value="gestaoPessoas"
                      control={<Radio />}
                      label="Gestão de pessoas"
                      {...register("type")}
                    />
                    <FormControlLabel
                      id="tipo-instutor-register-user"
                      value="instrutor"
                      control={<Radio />}
                      label="Instrutor"
                      {...register("type")}
                    />
                  </RadioGroup>
                </FormControl>
                <ErrorMessage id="error-type-register-user" width="100%">
                  {errors.type?.message}
                </ErrorMessage>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          paddingBottom={4}
          mt={4}
        >
          <Button
            id="button-submit-register-user"
            type="submit"
            variant="contained"
            sx={{ width: "200px", height: 40, borderRadius: 100 }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
