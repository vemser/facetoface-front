import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmitInterview = (data: IInterview) => {
    console.log(data);
  };

  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form
        id="form-register-interview"
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "70%",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(handleSubmitInterview)}
      >
        {/* first */}
        <Box
          display="flex"
          flexDirection="column"
          width={mdDown ? "80%" : "40%"}
          gap="1rem"
          m="auto"
          mt={mdDown ? "2rem" : "0"}
        >
          <Box>
            <TextField
              id="input-candidate-register-interview"
              sx={{ width: "100%" }}
              label="Candidato"
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
            <Typography
              id="error-candidate-register-interview"
              variant="subtitle1"
              color="red"
              sx={{ mr: "auto" }}
            >
              {errors.candidate?.message}
            </Typography>
          </Box>
          <Box>
            <TextField
              id="input-dateInterview-register-interview"
              sx={{ width: "100%" }}
              label="Data da entrevista"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("dateInterview")}
            />
            <Typography
              id="error-dateInterview-register-interview"
              variant="subtitle1"
              color="red"
              sx={{ mr: "auto" }}
            >
              {errors.dateInterview?.message}
            </Typography>
          </Box>
          <Box>
            <TextField
              id="input-city-register-interview"
              sx={{ width: "100%" }}
              label="Cidade"
              {...register("city")}
            />
            <Typography
              id="error-city-register-interview"
              variant="subtitle1"
              color="red"
              sx={{ mr: "auto" }}
            >
              {errors.city?.message}
            </Typography>
          </Box>
        </Box>
        {/* second */}
        <Box
          display="flex"
          flexDirection="column"
          width={mdDown ? "80%" : "40%"}
          gap="1rem"
          m="auto"
          mt={mdDown ? "1rem" : "0"}
        >
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              id="input-email-register-interview"
              label="E-mail do usuário"
              sx={{ width: "100%" }}
              {...register("email")}
            />
            <Typography
              id="error-email-register-interview"
              variant="subtitle1"
              color="red"
              width="90%"
            >
              {errors.email?.message}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              id="input-scheduleInterview-register-interview"
              label="Horário da entrevista"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "100%" }}
              {...register("scheduleInterview")}
            />
            <Typography
              id="error-scheduleInterview-register-interview"
              variant="subtitle1"
              color="red"
              width="90%"
            >
              {errors.scheduleInterview?.message}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              id="input-state-register-interview"
              label="Estado"
              sx={{ width: "100%" }}
              {...register("state")}
            />
            <Typography
              id="error-state--register-interview"
              variant="subtitle1"
              color="red"
              width="90%"
            >
              {errors.state?.message}
            </Typography>
          </Box>
        </Box>
        {/* textArea */}
        <Box
          display="flex"
          flexDirection="column"
          width={mdDown ? "90%" : "100%"}
          alignItems="center"
        >
          <TextField
            id="input-observation-register-interview"
            multiline
            label="Observações / Lembretes"
            sx={{ mt: 3, width: "90%" }}
            minRows={3}
            placeholder="Digite alguma observação..."
            InputLabelProps={{
              shrink: true,
            }}
            {...register("observation")}
          />
          <Typography
            id="error-observation-register-interview"
            variant="subtitle1"
            color="red"
            sx={{ mr: "auto" }}
          >
            {errors.observation?.message}
          </Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
          mt="1rem"
          mb={mdDown ? "2rem" : "0"}
        >
          <Typography
            width="70%"
            textAlign="center"
            id="subtitle-register-interview"
          >
            Após a finalização do cadastro, o candidato receberá um e-mail para
            confirmar a entrevista.
          </Typography>
          <Button
            id="button-submit-register-interview"
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
