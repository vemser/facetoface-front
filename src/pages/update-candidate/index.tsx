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
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TagLanguages, ErrorMessage } from "../../shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCandidateComplete } from "../../shared/schemas/register-candidate.schema";
import { ICandidateComplete } from "../../shared/interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCandidate } from "../../shared/contexts";
import { useLocation } from "react-router-dom";

interface ILanguages {
  nome: string;
}

export const UpdateCandidate: React.FC = () => {
  const [trilha, setTrilha] = useState<any>("");
  const [edicao, setEdicao] = useState<any>("");
  const [image, setImage] = useState(null);
  const [curriculo, setCurriculo] = useState(null);
  const [curriculoGet, setCurriculoGet] = useState(null);
  const [imageUser, setImageUser] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state } = useLocation();
  console.log(state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ICandidateComplete>({
    resolver: yupResolver(schemaCandidateComplete),
    defaultValues: {
      cidade: state.cidade,
      edicao: edicao,
      email: state.email,
      estado: state.estado,
      genero: state.genero,
      linguagens: state.linguagemList ? state.linguagemList : state.linguagens,
      nomeCompleto: state.nomeCompleto,
      observacoes: state.observacoes,
      trilha: trilha,
      notaProva: state.notaProva,
      idCandidato: state.idCandidato,
      ativo: state.ativo,
    },
  });
  const {
    putCandidate,
    postImage,
    getCandidateImage,
    postCurriculo,
    getCurriculo,
  } = useCandidate();
  const [arrLanguages, setArrLanguages] = useState<ILanguages[]>(
    state.linguagemList ? state.linguagemList : state.linguagens
  );
  const [language, setLanguage] = useState<string>("");
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let trilhaNome = state.trilha.nome;
    let trilha = state.trilha;
    if (!trilhaNome) setTrilha(trilha);
    else setTrilha(trilhaNome);
    let edicaoNome = state.edicao.nome;
    let edicao = state.edicao;
    if (!edicaoNome) setEdicao(edicao);
    else setEdicao(edicaoNome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchAll = watch();

  const handleClickFile = () => {
    inputRef.current?.click();
  };

  // lógica de pegar a imagem
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCurriculo = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setCurriculo(e.target.files[0]);
    }
  };

  const formDataCurriculo = new FormData();
  if (curriculo) {
    formDataCurriculo.append("file", curriculo);
  }

  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  }

  const handleSubmitCandidate = (data: ICandidateComplete) => {
    data.linguagens = arrLanguages;
    putCandidate(data);
    if (image) postImage(formData, state.email);
    if (curriculo) postCurriculo(formDataCurriculo, state.email);
    setArrLanguages([]);
    reset();
  };

  // Nome da página
  useEffect(() => {
    getCandidateImage(state.email).then((response) => setImageUser(response));
    getCurriculo(state.email).then((response) => setCurriculoGet(response));
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
          flexDirection="column"
        >
          <Avatar
            id="avatar-register-candidate"
            alt="Remy Sharp"
            src={
              image
                ? URL.createObjectURL(image)
                : imageUser
                ? `data:image/png;base64,${imageUser}`
                : ""
            }
            sx={{ width: 80, height: 80, m: "auto" }}
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
              focused={watchAll.nomeCompleto ? true : false}
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
              focused={watchAll.genero ? true : false}
            >
              <FormLabel id="label-genre-register-candidate">Gênero</FormLabel>
              <RadioGroup row defaultValue={state.genero}>
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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              mt: "1rem",
              flexDirection: "column",
            }}
          >
            <a
              download="file.pdf"
              href={"data:application/octet-stream;base64," + curriculoGet}
              title="Download Curriculo"
              style={{ width: "100%" }}
            >
              <Button variant="outlined" sx={{ width: "100%", height: "100%" }}>
                Baixar CV
              </Button>
            </a>
            <TextField
              id="input-cv-register-candidate"
              type="file"
              label="Atualizar CV"
              sx={{ width: "100%", mt: "1rem" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleCurriculo}
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
              <RadioGroup row defaultValue={state.trilha.nome}>
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
                defaultValue={state.edicao.nome}
                value={state.edicao.value}
                error={errors.edicao ? true : false}
                {...register("edicao.nome")}
              >
                <MenuItem id="edicao-1" value="1ª Edição">
                  1ª edição
                </MenuItem>
                <MenuItem id="edicao-2" value="2ª Edição">
                  2ª edição
                </MenuItem>
                <MenuItem id="edicao-3" value="3ª Edição">
                  3ª edição
                </MenuItem>
                <MenuItem id="edicao-4" value="4ª Edição">
                  4ª edição
                </MenuItem>
                <MenuItem id="edicao-5" value="5ª Edição">
                  5ª edição
                </MenuItem>
                <MenuItem id="edicao-6" value="6ª Edição">
                  6ª edição
                </MenuItem>
                <MenuItem id="edicao-7" value="7ª Edição">
                  7ª edição
                </MenuItem>
                <MenuItem id="edicao-8" value="8ª Edição">
                  8ª edição
                </MenuItem>
                <MenuItem id="edicao-9" value="9ª Edição">
                  9ª edição
                </MenuItem>
                <MenuItem id="edicao-10" value="10ª Edição">
                  10ª edição
                </MenuItem>
                <MenuItem id="edicao-11" value="11ª Edição">
                  11ª edição
                </MenuItem>
                <MenuItem id="edicao-12" value="12ª Edição">
                  12ª edição
                </MenuItem>
              </Select>
            </FormControl>
            <ErrorMessage id="error-edition-register-candidate" width={"100%"}>
              {errors.edicao?.message}
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
