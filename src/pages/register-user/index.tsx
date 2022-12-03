import React, { useContext, useRef, useState } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../shared/schemas/register-user.schema";
import { IUser } from "../../shared/interfaces";
import { ErrorMessage } from "../../shared/components";
import { UserContext } from "../../shared/contexts/userContext";

interface IProps {
  nome: string;
}

export const RegisterUser: React.FC = () => {
  const { postUser, postImage } = useContext(UserContext);
  const [roles, setRoles] = useState<IProps[]>([]);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  //imagem
  const [image, setImage] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [errorRole, setErrorRole] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUser>({ resolver: yupResolver(schemaUser) });

  const watchAll = watch();

  const handleSubmitUser = (data: IUser) => {
    if (roles.length === 0) setErrorRole(true);
    else {
      data.perfis = roles;
      console.log(data);
      if (image) postImage(formData, data.email);
      postUser(data);
    }
  };

  const handleClickFile = () => {
    inputRef.current?.click();
  };

  // lógica de pegar a imagem
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorRole(false);
    let exists = roles.find((item) => item.nome === event.target.value);
    if (exists) {
      let result = roles.filter((item) => item.nome !== exists?.nome);
      setRoles(result);
    } else setRoles([...roles, { nome: event.target.value }]);
  };

  return (
    <Box
      display="flex"
      width="100%"
      minHeight="100%"
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
          paddingTop: "5%",
        }}
      >
        {/* ------------- Box 1 ------------------ */}
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Avatar
            id="foto-register-candidate"
            alt="foto"
            src={image ? URL.createObjectURL(image) : ""}
            sx={{ width: 80, height: 80 }}
            onClick={handleClickFile}
          />
          <Button sx={{ margin: "1rem 0" }} onClick={handleClickFile}>
            Escolher foto
          </Button>
          <input
            id="input-file-register-candidate"
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
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
                {...register("nomeCompleto")}
                focused={watchAll.nomeCompleto ? true : false}
              />
              <ErrorMessage id="error-name-register-user" width="100%">
                {errors.nomeCompleto?.message}
              </ErrorMessage>
            </Box>

            <Box>
              <TextField
                id="cidade-register-user"
                label="Cidade"
                sx={{ width: "100%" }}
                {...register("cidade")}
                focused={watchAll.cidade ? true : false}
              />
              <ErrorMessage id="error-cidade-register-user" width="100%">
                {errors.cidade?.message}
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
                    value="FEMININO"
                    control={<Radio />}
                    label="Feminino"
                    {...register("genero")}
                  />
                  <FormControlLabel
                    id="genero-masculino-register-user"
                    value="MASCULINO"
                    control={<Radio />}
                    label="Masculino"
                    {...register("genero")}
                  />
                  <FormControlLabel
                    id="genero-masculino-register-user"
                    value="OUTRO"
                    control={<Radio />}
                    label="Outros"
                    {...register("genero")}
                  />
                </RadioGroup>
              </FormControl>
              <ErrorMessage id="error-genero-register-user" width="100%">
                {errors.genero?.message}
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
                  focused={watchAll.email ? true : false}
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
                {...register("estado")}
                focused={watchAll.estado ? true : false}
              />
              <ErrorMessage id="error-state-register-user" width="100%">
                {errors.estado?.message}
              </ErrorMessage>
            </Box>

            <Box>
              <Box sx={{ width: "100%" }}>
                <FormControl>
                  <FormLabel id="label-tipo-register-user">Tipo</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox value="ROLE_GESTAO" onChange={handleChange} />
                      }
                      label="Gestão de pessoas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="ROLE_INSTRUTOR"
                          onChange={handleChange}
                        />
                      }
                      label="Instrutor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox value="ROLE_ADMIN" onChange={handleChange} />
                      }
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
                <ErrorMessage id="error-type-register-user" width="100%">
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
            id="button-submit-register-user"
            type="submit"
            variant="contained"
            onClick={() => {
              if (roles.length === 0) setErrorRole(true);
            }}
            sx={{ width: "200px", height: 40, borderRadius: 100 }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
