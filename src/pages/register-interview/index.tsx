import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Header } from "../../shared/components";
import { useForm } from "react-hook-form";

export const RegisterInterview: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitInterview = (data: any) => {
    console.log(data);
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Header />
      <form
        onSubmit={handleSubmit(handleSubmitInterview)}
        style={{
          width: "600px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "80px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          alignItems="flex-start"
          gap="1.5rem"
        >
          <TextField
            label="Candidato"
            sx={{ width: "90%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("candidate")}
          />
          <TextField
            id="date"
            label="Data da entrevista"
            type="date"
            sx={{ width: "90%" }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("date-interview")}
          />
          <TextField
            label="Cidade"
            sx={{ width: "90%" }}
            {...register("city")}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          alignItems="flex-end"
          gap="1.5rem"
        >
          <TextField
            label="E-mail do candidato"
            sx={{ width: "90%" }}
            {...register("email")}
          />
          <TextField
            id="time"
            label="Horário da entrevista"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: "90%" }}
            {...register("schedule-interview")}
          />
          <TextField label="Estado" sx={{ width: "90%" }} />
        </Box>
        <TextField
          fullWidth
          multiline
          label="Observações / Lembretes"
          sx={{ mt: 4 }}
          minRows={3}
          placeholder="Digite alguma observação..."
          InputLabelProps={{
            shrink: true,
          }}
          {...register("observation")}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "25%", borderRadius: 100, ml: "auto", mt: 5 }}
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};
