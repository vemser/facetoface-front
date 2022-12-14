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
import { useCandidate } from "../../shared/contexts";
import { useRef } from "react";

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
  const { postCandidate, postImage, postCurriculo } = useCandidate();
  const [arrLanguages, setArrLanguages] = useState<ILanguages[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [curriculo, setCurriculo] = useState<File | null>(null);
  const [curriculoError, setCurriculoError] = useState<boolean>(false);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef<HTMLInputElement>(null);

  const edicao = watch("edicao.nome");
  const watchAll = watch();

  const handleSubmitCandidate = async (data: ICandidate) => {
    if (curriculo) {
      data.linguagens = arrLanguages;
      await postCandidate(data);
      await postCurriculo(formDataCurriculo, data.email);
      if (image) postImage(formData, data.email);
      setArrLanguages([]);
      reset();
    } else setCurriculoError(true);
  };

  // pegar curriculo
  const handleCurriculo = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setCurriculo(e.target.files[0]);
      setCurriculoError(false);
    }
  };

  const formDataCurriculo = new FormData();
  if (curriculo) {
    formDataCurriculo.append("file", curriculo);
  }

  // l??gica de adicionar languages
  const handleAddLanguages = () => {
    setArrLanguages([...arrLanguages, { nome: language }]);
    setLanguage("");
  };

  // l??gica de remover languages
  const removeLanguage = (language: string) => {
    let arrAux = arrLanguages.filter((item) => item.nome !== language);
    setArrLanguages(arrAux);
  };

  const handleClickFile = () => {
    inputRef.current?.click();
  };

  // l??gica de pegar a imagem
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  }

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
          justifyContent="center"
          flexDirection="column"
        >
          <Avatar
            id="avatar-register-candidate"
            alt="Remy Sharp"
            src={image ? URL.createObjectURL(image) : ""}
            sx={{ width: 80, height: 80, m: "auto", cursor: "pointer" }}
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
            accept="./jpg"
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
            >
              <FormLabel id="label-genre-register-candidate">G??nero</FormLabel>
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
              focused={watchAll.cidade ? true : false}
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
              onChange={handleCurriculo}
              focused={curriculo ? true : false}
            />
            <ErrorMessage id="error-cv-register-candidate" width={"100%"}>
              {curriculoError ? "CV ?? obrigat??rio!" : ""}
            </ErrorMessage>
          </Box>
          {/* email box */}
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-email-register-candidate"
              label="E-mail do candidato"
              sx={{ width: "100%" }}
              {...register("email")}
              error={errors.email ? true : false}
              focused={watchAll.email ? true : false}
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
              label="Observa????es / Lembretes"
              minRows={3}
              placeholder="Digite alguma observa????o..."
              InputLabelProps={{
                shrink: true,
              }}
              {...register("observacoes")}
              error={errors.observacoes ? true : false}
              focused={watchAll.observacoes ? true : false}
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
              focused={watchAll.estado ? true : false}
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
                  {...register("trilha")}
                />
                <FormControlLabel
                  id="backend-register-candidate"
                  value="BACKEND"
                  control={<Radio />}
                  label="Back"
                  {...register("trilha")}
                />
                <FormControlLabel
                  id="qa-register-candidate"
                  value="QA"
                  control={<Radio />}
                  label="QA"
                  {...register("trilha")}
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
              focused={edicao ? true : false}
            >
              <InputLabel id="label-edition-register-candidate">
                Edi????o vem ser
              </InputLabel>
              <Select
                placeholder="Edi????o vem ser"
                id="select-edition"
                sx={{ width: "100%" }}
                label="Edi????o vem ser"
                value={edicao ? edicao : ""}
                error={errors.edicao ? true : false}
                {...register("edicao.nome")}
              >
                <MenuItem id="selected" value={""} selected>
                  Selecione uma edi????o
                </MenuItem>
                <MenuItem id="edicao-1" value="1?? Edi????o">
                  1?? edi????o
                </MenuItem>
                <MenuItem id="edicao-2" value="2?? Edi????o">
                  1?? edi????o
                </MenuItem>
                <MenuItem id="edicao-3" value="3?? Edi????o">
                  3?? edi????o
                </MenuItem>
                <MenuItem id="edicao-4" value="4?? Edi????o">
                  4?? edi????o
                </MenuItem>
                <MenuItem id="edicao-5" value="5?? Edi????o">
                  5?? edi????o
                </MenuItem>
                <MenuItem id="edicao-6" value="6?? Edi????o">
                  6?? edi????o
                </MenuItem>
                <MenuItem id="edicao-7" value="7?? Edi????o">
                  7?? edi????o
                </MenuItem>
                <MenuItem id="edicao-8" value="8?? Edi????o">
                  8?? edi????o
                </MenuItem>
                <MenuItem id="edicao-9" value="9?? Edi????o">
                  9?? edi????o
                </MenuItem>
                <MenuItem id="edicao-10" value="10?? Edi????o">
                  10?? edi????o
                </MenuItem>
                <MenuItem id="edicao-11" value="11?? Edi????o">
                  11?? edi????o
                </MenuItem>
                <MenuItem id="edicao-12" value="12?? Edi????o">
                  12?? edi????o
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
              label="Linguagens de programa????o que voc?? conhece"
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
              onClick={() => {
                if (!curriculo) setCurriculoError(true);
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
