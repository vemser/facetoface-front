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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TagLanguages } from "../../shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCandidate } from "../../shared/schemas/register-candidate.schema";
import { ICandidate } from "../../shared/interfaces";

export const RegisterCandidate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ICandidate>();

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
        onSubmit={handleSubmit(handleSubmitCandidate)}
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "70%",
          justifyContent: "space-between",
        }}
      >
        {/* input avatar */}
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Avatar
            id="foto-register-candidate"
            alt="Remy Sharp"
            src="Foto perfil"
            sx={{ width: 100, height: 100 }}
          />
          <TextField
            id="up-foto-register-candidate"
            type="file"
            label="Foto"
            sx={{
              width: "80%",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        {/* first column */}
        <Box
          display="flex"
          width="45%"
          alignItems="center"
          flexDirection="column"
        >
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="nome-register-candidate"
              label="Nome completo"
              sx={{ width: "100%" }}
              {...register("name")}
            />
          </Box>
          <FormControl sx={{ width: "100%", mt: "1rem" }}>
            <FormLabel id="label-genero-register-candidate">Gênero</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                id="genero-feminino-register-candidato"
                value="feminino"
                control={<Radio />}
                label="Feminino"
                {...register("genre")}
              />
              <FormControlLabel
                id="genero-masculino-register-candidato"
                value="masculino"
                control={<Radio />}
                label="Masculino"
                {...register("genre")}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="cidade-register-candidate"
            label="Cidade"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("city")}
          />
          <TextField
            id="up-cv-register-candidate"
            type="file"
            label="CV"
            sx={{ width: "100%", mt: "1rem" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="E-mail do candidato"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("email")}
          />
          <TextField
            multiline
            sx={{ width: "100%", mt: "1rem" }}
            label="Observações / Lembretes"
            minRows={3}
            placeholder="Digite alguma observação..."
            InputLabelProps={{
              shrink: true,
            }}
            {...register("observation")}
          />
        </Box>
        {/* second column */}
        <Box
          display="flex"
          width="45%"
          alignItems="center"
          flexDirection="column"
        >
          <TextField
            id="estado-register-candidate"
            label="Estado"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("state")}
          />
          <FormControl sx={{ mt: "1rem", width: "100%" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
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
          <FormControl sx={{ mt: "1rem", width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              Edição vem ser
            </InputLabel>
            <Select
              id="select-edicao"
              sx={{ width: "100%" }}
              label="Edição vem ser"
              value={edition ? edition : ""}
              //onChange={handleChange}
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
          <TextField
            id="linguagens-register-candidate"
            type="text"
            label="Linguagens de programação que você conhece"
            sx={{ width: "100%", mt: "1rem" }}
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
