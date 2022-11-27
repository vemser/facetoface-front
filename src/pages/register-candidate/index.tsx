import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TagLanguages, ErrorMessage } from "../../shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCandidate } from "../../shared/schemas/register-candidate.schema";
import { ICandidate } from "../../shared/interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";

export const RegisterCandidate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ICandidate>({ resolver: yupResolver(schemaCandidate) });
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const edition = watch("edition");

  const handleSubmitCandidate = (data: ICandidate) => {
    data.languages = arrLanguages;
    console.log(data);
    setArrLanguages([]);
    reset();
  };

  const [arrLanguages, setArrLanguages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");

  // lógica de adicionar languages
  const handleAddLanguages = () => {
    setArrLanguages([...arrLanguages, language]);
    setLanguage("");
  };

  // lógica de remover languages
  const removeLanguage = (language: string) => {
    let arrAux = arrLanguages.filter((item) => item !== language);
    setArrLanguages(arrAux);
  };

  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form
        id="form-register-candidate"
        onSubmit={handleSubmit(handleSubmitCandidate)}
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "70%",
          justifyContent: "space-between",
          padding: "5% 0",
        }}
      >
        {/* input avatar */}
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={mdDown ? "column" : "row"}
        >
          <Avatar
            id="avatar-register-candidate"
            alt="Remy Sharp"
            src="Foto perfil"
            sx={{ width: 80, height: 80, m: "auto" }}
          />
          <TextField
            id="input-avatar-register-candidate"
            type="file"
            label="Foto"
            sx={{
              width: `${mdDown ? "100%" : "80%"}`,
              marginTop: `${mdDown ? "20px" : "0"}`,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        {/* first column */}
        <Box
          display="flex"
          width={mdDown ? "100%" : "45%"}
          alignItems="center"
          flexDirection="column"
        >
          {/* name box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-name-register-candidate"
              label="Nome completo"
              sx={{ width: "100%" }}
              {...register("name")}
              error={errors.name ? true : false}
            />
            <ErrorMessage id="error-name-register-candidate" width={"100%"}>
              {errors.name?.message}
            </ErrorMessage>
          </Box>
          {/* genre box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <FormControl
              id="input-genre-register-candidate"
              sx={{ width: "100%" }}
              error={errors.genre ? true : false}
            >
              <FormLabel id="label-genre-register-candidate">Gênero</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  id="genre-feminino-register-candidato"
                  value="feminino"
                  control={<Radio />}
                  label="Feminino"
                  {...register("genre")}
                />
                <FormControlLabel
                  id="genre-masculino-register-candidato"
                  value="masculino"
                  control={<Radio />}
                  label="Masculino"
                  {...register("genre")}
                />
              </RadioGroup>
            </FormControl>
            <ErrorMessage id="error-genre-register-candidate" width={"100%"}>
              {errors.genre?.message}
            </ErrorMessage>
          </Box>
          {/* city box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-city-register-candidate"
              label="Cidade"
              sx={{ width: "100%" }}
              {...register("city")}
              error={errors.city ? true : false}
            />
            <ErrorMessage id="erros-city-register-candidate" width={"100%"}>
              {errors.city?.message}
            </ErrorMessage>
          </Box>
          {/* cv box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-cv-register-candidate"
              type="file"
              label="CV"
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          {/* email box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-email-register-candidate"
              label="E-mail do candidato"
              sx={{ width: "100%" }}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <ErrorMessage id="error-email-register-candidate" width={"100%"}>
              {errors.email?.message}
            </ErrorMessage>
          </Box>
          {/* observation box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-observation-register-candidate"
              multiline
              sx={{ width: "100%" }}
              label="Observações / Lembretes"
              minRows={3}
              placeholder="Digite alguma observação..."
              InputLabelProps={{
                shrink: true,
              }}
              {...register("observation")}
              error={errors.observation ? true : false}
            />
            <ErrorMessage
              id="error-observation-register-candidate"
              width={"100%"}
            >
              {errors.observation?.message}
            </ErrorMessage>
          </Box>
        </Box>
        {/* second column */}
        <Box
          display="flex"
          width={mdDown ? "100%" : "45%"}
          alignItems="center"
          flexDirection="column"
        >
          {/* state box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-state-register-candidate"
              label="Estado"
              sx={{ width: "100%" }}
              error={errors.state ? true : false}
              {...register("state")}
            />
            <ErrorMessage id="error-state-register-candidate" width={"100%"}>
              {errors.state?.message}
            </ErrorMessage>
          </Box>
          {/* class box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <FormControl
              id="input-class-register-candidate"
              sx={{ width: "100%" }}
              error={errors.class ? true : false}
            >
              <FormLabel id="label-class-register-candidate">
                Turma escolhida
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  id="frontend-register-candidate"
                  value="frontend"
                  control={<Radio />}
                  label="Front"
                  {...register("class")}
                />
                <FormControlLabel
                  id="backend-register-candidate"
                  value="backend"
                  control={<Radio />}
                  label="Back"
                  {...register("class")}
                />
                <FormControlLabel
                  id="qa-register-candidate"
                  value="qa"
                  control={<Radio />}
                  label="QA"
                  {...register("class")}
                />
              </RadioGroup>
            </FormControl>
            <ErrorMessage id="error-class-register-candidate" width={"100%"}>
              {errors.class?.message}
            </ErrorMessage>
          </Box>
          {/* edition box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <FormControl
              id="input-edition-register-candidate"
              sx={{ width: "100%" }}
            >
              <InputLabel id="label-edition-register-candidate">
                Edição vem ser
              </InputLabel>
              <Select
                id="select-edition"
                sx={{ width: "100%" }}
                label="Edição vem ser"
                value={edition ? edition : ""}
                error={errors.edition ? true : false}
                {...register("edition")}
              >
                <MenuItem id="selected" value={""} selected>
                  Selecione uma edição
                </MenuItem>
                <MenuItem id="edicao-9" value="edicao9">
                  9ª edição
                </MenuItem>
                <MenuItem id="edicao-10" value="edicao10">
                  10ª edição
                </MenuItem>
                <MenuItem id="edicao-11" value="edicao11">
                  11ª edição
                </MenuItem>
                <MenuItem id="edicao-12" value="edicao12">
                  12ª edição
                </MenuItem>
              </Select>
            </FormControl>
            <ErrorMessage id="error-edition-register-candidate" width={"100%"}>
              {errors.edition?.message}
            </ErrorMessage>
          </Box>
          {/* languages box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-languages-register-candidate"
              type="text"
              label="Linguagens de programação que você conhece"
              sx={{ width: "100%" }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleAddLanguages}>
                      <AddCircleIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxHeight: "102px",
              minHeight: "102px",
              mt: "1rem",
              border: "1px dotted #BDBDBD",
              borderRadius: "4px",
              alignItems: "flex-start",
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            {arrLanguages.map((item) => {
              return (
                <TagLanguages
                  key={item}
                  language={item}
                  onClick={() => removeLanguage(item)}
                />
              );
            })}
          </Box>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
            mt="1rem"
          >
            <Button
              id="button-submit-register-candidate"
              type="submit"
              variant="contained"
              sx={{
                width: "200px",
                borderRadius: 100,
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
