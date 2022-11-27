import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
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

export const RegisterCandidate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitCandidate = (data: any) => {
    console.log(data);
  };

  const [arrLanguages, setArrLanguages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");

  const handleAddLanguages = () => {
    setArrLanguages([...arrLanguages, language]);
    setLanguage("");
  };

  const [edicao, setEdicao] = useState("");

  function handleChange(event: any) {
    setEdicao(event.target.value);
  }
  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt="5rem"
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
          <TextField
            id="nome-register-candidate"
            label="Nome completo"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("nomeCompleto")}
          />
          <FormControl sx={{ width: "100%", mt: "1rem" }}>
            <FormLabel id="label-genero-register-candidate">Gênero</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                id="genero-feminino-register-candidato"
                value="feminino"
                control={<Radio />}
                label="Feminino"
                {...register("feminino")}
              />
              <FormControlLabel
                id="genero-masculino-register-candidato"
                value="masculino"
                control={<Radio />}
                label="Masculino"
                {...register("masculino")}
              />
            </RadioGroup>
          </FormControl>

          <TextField
            id="cidade-register-candidate"
            label="Cidade"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("cidade")}
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
            id="observation-register-candidate"
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
            {...register("estado")}
          />
          <FormControl sx={{ mt: "1rem", width: "100%" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Turma escolhida
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                id="frontend-register-candidate"
                value="frontend"
                control={<Radio />}
                label="Front"
                {...register("frontend")}
              />
              <FormControlLabel
                id="backend-register-candidate"
                value="backend"
                control={<Radio />}
                label="Back"
                {...register("backend")}
              />

              <FormControlLabel
                id="qa-register-candidate"
                value="qa"
                control={<Radio />}
                label="QA"
                {...register("qa")}
              />
            </RadioGroup>
          </FormControl>
          <Select
            id="select-edicao"
            value={edicao}
            label="Edição vem ser"
            onChange={handleChange}
            sx={{ width: "100%", mt: "1rem" }}
          >
            <MenuItem id="edicao-9" value={9}>
              9ª edição
            </MenuItem>
            <MenuItem id="edicao-10" value={10}>
              10ª edição
            </MenuItem>
            <MenuItem id="edicao-11" value={11}>
              11ª edição
            </MenuItem>
            <MenuItem id="edicao-12" value={12}>
              12ª edição
            </MenuItem>
          </Select>
          <TextField
            id="linguagens-register-candidate"
            type="text"
            label="Linguagens de programação que você conhece"
            sx={{ width: "100%", mt: "1rem" }}
            {...register("email")}
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
              width: "100%",
              height: "100%",
              mt: "1rem",
              border: "1px solid #BDBDBD",
              borderRadius: "4px",
            }}
          ></Box>
        </Box>

        <Box
          display="flex"
          width="100%"
          alignItems="flex-start"
          gap="4rem"
          mt={4}
        >
          <Button
            id="button-submit-register-candidate"
            type="submit"
            variant="contained"
            sx={{
              width: "25%",
              borderRadius: 100,
              ml: "auto",
              mt: 5,
            }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
