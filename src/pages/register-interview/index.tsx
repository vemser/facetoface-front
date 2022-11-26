import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Header } from "../../shared/components";
import { useForm } from "react-hook-form";
import { IInterview } from "../../shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaInterview } from "../../shared/schemas";
import useMediaQuery from "@mui/material/useMediaQuery";

export const RegisterInterview: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInterview>({ resolver: yupResolver(schemaInterview) });
  const matches = useMediaQuery(`(min-width:600px)`);

  const styleResponsivo = {
    alignItems: "center",
  };

  const handleSubmitInterview = (data: IInterview) => {
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
      <form
        onSubmit={handleSubmit(handleSubmitInterview)}
        style={{
          maxWidth: "650px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "80px",
          gap: "1rem",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="300px"
          alignItems="center"
          gap="1.5rem"
        >
          <Box width="100%">
            <TextField
              label="Candidato"
              sx={{ width: "100%" }}
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
            <Typography variant="subtitle1" color="red" sx={{ mr: "auto" }}>
              {errors.candidate?.message}
            </Typography>
          </Box>
          <Box width="100%">
            <TextField
              id="date"
              label="Data da entrevista"
              type="date"
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("dateInterview")}
            />
            <Typography variant="subtitle1" color="red" sx={{ mr: "auto" }}>
              {errors.dateInterview?.message}
            </Typography>
          </Box>
          <Box width="100%">
            <TextField
              label="Cidade"
              sx={{ width: "100%" }}
              {...register("city")}
            />
            <Typography variant="subtitle1" color="red" sx={{ mr: "auto" }}>
              {errors.city?.message}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="300px"
          alignItems="center"
          gap="1.5rem"
        >
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              label="E-mail do candidato"
              sx={{ width: "100%" }}
              {...register("email")}
            />
            <Typography variant="subtitle1" color="red" width="90%">
              {errors.email?.message}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              id="time"
              label="Horário da entrevista"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "100%" }}
              {...register("scheduleInterview")}
            />
            <Typography variant="subtitle1" color="red" width="90%">
              {errors.scheduleInterview?.message}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              label="Estado"
              sx={{ width: "100%" }}
              {...register("state")}
            />
            <Typography variant="subtitle1" color="red" width="1%">
              {errors.state?.message}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="625px"
          alignItems="center"
        >
          <TextField
            fullWidth={matches && true}
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
          <Typography variant="subtitle1" color="red" sx={{ mr: "auto" }}>
            {errors.observation?.message}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
          mt="1rem"
        >
          <Typography width="70%" textAlign="center">
            Após a finalização do cadastro, o candidato receberá um e-mail para
            confirmar a entrevista.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "25%", borderRadius: 100 }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
