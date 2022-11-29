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
  import React, { useContext, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { schemaUser } from "../../shared/schemas/register-user.schema";
  import { IUserComplete, IUser } from "../../shared/interfaces";
  import { ErrorMessage } from "../../shared/components";
  import { UserContext } from "../../shared/contexts/userContext";
import { useLocation } from "react-router-dom";
  
  export const UpdateUser: React.FC = () => {
    const {putUser} = useContext(UserContext);
    const { state } = useLocation();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IUserComplete>({ resolver: yupResolver(schemaUser),
      defaultValues: {
        nomeCompleto: state.nomeCompleto,
        cidade: state.cidade,
        estado: state.estado,
        email: state.email,
        genero: state.genero,
        trilha: state.trilha,
        perfis: state.perfis,
        ativo: state.ativo,
        idUsuario: state.idUsuario
      }
    });
  
    const handleSubmitUser = (data: IUserComplete) => {
    putUser(data);
    };
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  
    useEffect(() => {
      document.title = `Editar usuário`;
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
              id="foto-editar-usuario"
              alt="foto"
              src=""
              sx={{ width: 100, height: 100 }}
            />
            <TextField
              id="up-foto-editar-usuario"
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
                  id="name-editar-usuario"
                  label="Nome completo"
                  sx={{ width: "100%" }}
                  {...register("nomeCompleto")}
                />
                <ErrorMessage id="error-name-editar-usuario" width="100%">
                  {errors.nomeCompleto?.message}
                </ErrorMessage>
              </Box>
  
              <Box>
                <TextField
                  id="cidade-editar-usuario"
                  label="Cidade"
                  sx={{ width: "100%" }}
                  {...register("cidade")}
                />
                <ErrorMessage id="error-cidade-editar-usuario" width="100%">
                  {errors.cidade?.message}
                </ErrorMessage>
              </Box>
              <Box sx={{ width: "100%" }}>
                <FormControl>
                  <FormLabel id="label-genero-editar-usuario">
                    Gênero
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      id="genero-feminino-editar-usuario"
                      value="FEMININO"
                      control={<Radio />}
                      label="Feminino"
                      {...register("genero")}
                    />
                    <FormControlLabel
                      id="genero-masculino-editar-usuario"
                      value="MASCULINO"
                      control={<Radio />}
                      label="Masculino"
                      {...register("genero")}
                    />
                    <FormControlLabel
                      id="genero-masculino-editar-usuario"
                      value="OUTRO"
                      control={<Radio />}
                      label="Outros"
                      {...register("genero")}
                    />
                  </RadioGroup>
                </FormControl>
                <ErrorMessage id="error-genero-editar-usuarior" width="100%">
                  {errors.genero?.message}
                </ErrorMessage>
              </Box>
            </Box>
  
            {/* ---------------- Col 2 ----------------- */}
            <Box display="flex" width="100%" flexDirection="column" gap={3}>
              <Box>
                <Box>
                  <TextField
                    id="email-editar-usuario"
                    label="Email"
                    sx={{ width: "100%" }}
                    {...register("email")}
                  />
                  <ErrorMessage id="error-email-editar-usuario" width="100%">
                    {errors.email?.message}
                  </ErrorMessage>
                </Box>
              </Box>
  
              <Box>
                <TextField
                  id="estado-register-user"
                  label="Estado"
                  sx={{ width: "100%" }}
                  {...register("estado")}
                />
                <ErrorMessage id="error-state-editar-usuario" width="100%">
                  {errors.estado?.message}
                </ErrorMessage>
              </Box>
  
              <Box>
                <Box sx={{ width: "100%" }}>
                  <FormControl>
                    <FormLabel id="label-tipo-editar-usuario">Tipo</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-editar-usuario"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        id="tipo-gestao-editar-usuario"
                        value="ROLE_GESTAO"
                        control={<Radio />}
                        label="Gestão de pessoas"
                        {...register("perfis")}
                      />
                      <FormControlLabel
                        id="tipo-instutor-editar-usuario"
                        value="ROLE_INSTRUTOR"
                        control={<Radio />}
                        label="Instrutor"
                        {...register("perfis")}
                      />
                    </RadioGroup>
                  </FormControl>
                  <ErrorMessage id="error-type-editar-usuario" width="100%">
                    {errors.perfis?.message}
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
              id="button-submit-editar-usuario"
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
  