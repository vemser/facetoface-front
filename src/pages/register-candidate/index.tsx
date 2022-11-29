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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TagLanguages, ErrorMessage } from "../../shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCandidate } from "../../shared/schemas/register-candidate.schema";
import { ICandidate } from "../../shared/interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCandidate } from "../../shared/contexts";

interface ILanguages {
  nome: string;
}

export const RegisterCandidate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ICandidate>({ resolver: yupResolver(schemaCandidate) });
  const { postCandidate } = useCandidate();
  const [arrLanguages, setArrLanguages] = useState<ILanguages[]>([]);
  const [language, setLanguage] = useState<string>("");
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const edicao = watch("edicao.nome");

  const handleSubmitCandidate = (data: ICandidate) => {
    data.linguagens = arrLanguages;
    postCandidate(data);
    setArrLanguages([]);
    reset();
  };
  // Nome da página
  useEffect(() => {
    document.title = `Cadastro de candidato`;
  }, []);

  // lógica de adicionar languages
  const handleAddLanguages = () => {
    setArrLanguages([...arrLanguages, { nome: language }]);
    setLanguage("");
  };

  // lógica de remover languages
  const removeLanguage = (language: string) => {
    let arrAux = arrLanguages.filter((item) => item.nome !== language);
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
              {...register("nomeCompleto")}
              error={errors.nomeCompleto ? true : false}
            />
            <ErrorMessage id="error-name-register-candidate" width={"100%"}>
              {errors.nomeCompleto?.message}
            </ErrorMessage>
          </Box>
          {/* genre box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <FormControl
              id="input-genre-register-candidate"
              sx={{ width: "100%" }}
              error={errors.genero ? true : false}
            >
              <FormLabel id="label-genre-register-candidate">Gênero</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  id="genre-feminino-register-candidato"
                  value="FEMININO"
                  control={<Radio />}
                  label="Feminino"
                  {...register("genero")}
                />
                <FormControlLabel
                  id="genre-masculino-register-candidato"
                  value="MASCULINO"
                  control={<Radio />}
                  label="Masculino"
                  {...register("genero")}
                />
                <FormControlLabel
                  id="genre-masculino-register-candidato"
                  value="OUTRO"
                  control={<Radio />}
                  label="Outro"
                  {...register("genero")}
                />
              </RadioGroup>
            </FormControl>
            <ErrorMessage id="error-genre-register-candidate" width={"100%"}>
              {errors.genero?.message}
            </ErrorMessage>
          </Box>
          {/* city box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-city-register-candidate"
              label="Cidade"
              sx={{ width: "100%" }}
              {...register("cidade")}
              error={errors.cidade ? true : false}
            />
            <ErrorMessage id="erros-city-register-candidate" width={"100%"}>
              {errors.cidade?.message}
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
              {...register("observacoes")}
              error={errors.observacoes ? true : false}
            />
            <ErrorMessage
              id="error-observation-register-candidate"
              width={"100%"}
            >
              {errors.observacoes?.message}
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
              error={errors.estado ? true : false}
              {...register("estado")}
            />
            <ErrorMessage id="error-state-register-candidate" width={"100%"}>
              {errors.estado?.message}
            </ErrorMessage>
          </Box>
          {/* class box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <FormControl
              id="input-class-register-candidate"
              sx={{ width: "100%" }}
              error={errors.trilha ? true : false}
            >
              <FormLabel id="label-class-register-candidate">
                Turma escolhida
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  id="frontend-register-candidate"
                  value="FRONTEND"
                  control={<Radio />}
                  label="Front"
                  {...register("trilha.nome")}
                />
                <FormControlLabel
                  id="backend-register-candidate"
                  value="BACKEND"
                  control={<Radio />}
                  label="Back"
                  {...register("trilha.nome")}
                />
                <FormControlLabel
                  id="qa-register-candidate"
                  value="QA"
                  control={<Radio />}
                  label="QA"
                  {...register("trilha.nome")}
                />
              </RadioGroup>
            </FormControl>
            <ErrorMessage id="error-class-register-candidate" width={"100%"}>
              {errors.trilha?.message}
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
                placeholder="Edição vem ser"
                id="select-edition"
                sx={{ width: "100%" }}
                label="Edição vem ser"
                value={edicao ? edicao : ""}
                error={errors.edicao ? true : false}
                {...register("edicao.nome")}
              >
                <MenuItem id="selected" value={""} selected>
                  Selecione uma edição
                </MenuItem>
                <MenuItem id="edicao-9" value="EDICAO9">
                  9ª edição
                </MenuItem>
                <MenuItem id="edicao-10" value="EDICAO10">
                  10ª edição
                </MenuItem>
                <MenuItem id="edicao-11" value="EDICAO11">
                  11ª edição
                </MenuItem>
                <MenuItem id="edicao-12" value="EDICAO12">
                  12ª edição
                </MenuItem>
              </Select>
            </FormControl>
            <ErrorMessage id="error-edition-register-candidate" width={"100%"}>
              {errors.edicao?.nome?.message}
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
                  key={item.nome}
                  language={item.nome}
                  onClick={() => removeLanguage(item.nome)}
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
