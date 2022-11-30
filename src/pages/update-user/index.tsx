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
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../shared/schemas/register-user.schema";
import { IUserComplete } from "../../shared/interfaces";
import { ErrorMessage } from "../../shared/components";
import { UserContext } from "../../shared/contexts/userContext";
import { useLocation } from "react-router-dom";

interface IProps {
  nome: string;
}

export const UpdateUser: React.FC = () => {
  const { putUser } = useContext(UserContext);
  const { state } = useLocation();
  const [roles, setRoles] = useState<IProps[]>(state.perfis);
  const [errorRole, setErrorRole] = React.useState(false);

  let admin = state.perfis.find((item: any) => item.nome === "ROLE_ADMIN");
  let gestao = state.perfis.find((item: any) => item.nome === "ROLE_GESTAO");
  let instrutor = state.perfis.find(
    (item: any) => item.nome === "ROLE_INSTRUTOR"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserComplete>({
    resolver: yupResolver(schemaUser),
    defaultValues: {
      nomeCompleto: state.nomeCompleto,
      cidade: state.cidade,
      estado: state.estado,
      email: state.email,
      genero: state.genero,
      trilha: state.trilha,
      perfis: state.perfis,
      ativo: state.ativo,
      idUsuario: state.idUsuario,
    },
  });

  const handleSubmitUser = (data: IUserComplete) => {
    if (roles.length === 0) setErrorRole(true);
    else {
      data.perfis = roles;
      putUser(data);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorRole(false);
    let exists = roles.find((item) => item.nome === event.target.value);
    if (exists) {
      let result = roles.filter((item) => item.nome !== exists?.nome);
      setRoles(result);
    } else setRoles([...roles, { nome: event.target.value }]);
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
                <FormLabel id="label-genero-editar-usuario">Gênero</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={state.genero}
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
                  <RadioGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={gestao}
                          value="ROLE_GESTAO"
                          onChange={handleChange}
                        />
                      }
                      label="Gestão de pessoas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={instrutor}
                          value="ROLE_INSTRUTOR"
                          onChange={handleChange}
                        />
                      }
                      label="Instrutor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={admin}
                          value="ROLE_ADMIN"
                          onChange={handleChange}
                        />
                      }
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
                <ErrorMessage id="error-type-editar-user" width="100%">
                  {errorRole && "Campo obrigatório!"}
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
