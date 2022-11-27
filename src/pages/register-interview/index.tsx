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
import { ErrorMessage } from "../../shared/components";

export const RegisterInterview: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IInterview>({ resolver: yupResolver(schemaInterview) });
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmitInterview = (data: IInterview) => {
    console.log(data);
    reset();
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
          justifyContent: "space-between",
          padding: "5% 0",
        }}
        onSubmit={handleSubmit(handleSubmitInterview)}
      >
        {/* first */}
        <Box
          display="flex"
          width={mdDown ? "100%" : "45%"}
          alignItems="center"
          flexDirection="column"
        >
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-candidate-register-interview"
              sx={{ width: "100%" }}
              label="Candidato"
              error={errors.candidate ? true : false}
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
            <ErrorMessage id="error-candidate-register-interview" width="100%">
              {errors.candidate?.message}
            </ErrorMessage>
          </Box>
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-dateInterview-register-interview"
              sx={{ width: "100%" }}
              label="Data da entrevista"
              type="date"
              error={errors.dateInterview ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("dateInterview")}
            />
            <ErrorMessage
              id="error-dateInterview-register-interview"
              width="100%"
            >
              {errors.dateInterview?.message}
            </ErrorMessage>
          </Box>
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-city-register-interview"
              sx={{ width: "100%" }}
              label="Cidade"
              {...register("city")}
              error={errors.city ? true : false}
            />
            <ErrorMessage id="error-city-register-interview" width="100%">
              {errors.city?.message}
            </ErrorMessage>
          </Box>
        </Box>
        {/* second */}
        <Box
          display="flex"
          width={mdDown ? "100%" : "45%"}
          alignItems="center"
          flexDirection="column"
        >
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-email-register-interview"
              label="E-mail do usuário"
              sx={{ width: "100%" }}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <ErrorMessage id="error-email-register-interview" width="100%">
              {errors.email?.message}
            </ErrorMessage>
          </Box>
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-scheduleInterview-register-interview"
              label="Horário da entrevista"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "100%" }}
              {...register("scheduleInterview")}
              error={errors.scheduleInterview ? true : false}
            />
            <ErrorMessage
              id="error-scheduleInterview-register-interview"
              width="100%"
            >
              {errors.scheduleInterview?.message}
            </ErrorMessage>
          </Box>
          <Box sx={{ width: "100%", mt: "1rem" }}>
            <TextField
              id="input-state-register-interview"
              label="Estado"
              sx={{ width: "100%" }}
              {...register("state")}
              error={errors.state ? true : false}
            />
            <ErrorMessage id="error-state-register-interview" width="100%">
              {errors.state?.message}
            </ErrorMessage>
          </Box>
        </Box>
        {/* textArea */}
        <Box sx={{ width: "100%", mt: "1rem" }}>
          <TextField
            id="input-observation-register-interview"
            multiline
            label="Observações / Lembretes"
            sx={{ width: "100%" }}
            minRows={3}
            placeholder="Digite alguma observação..."
            InputLabelProps={{
              shrink: true,
            }}
            {...register("observation")}
            error={errors.observation ? true : false}
          />
          <ErrorMessage id="error-observation-register-interview" width="100%">
            {errors.observation?.message}
          </ErrorMessage>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
          mt="1rem"
        >
          <Typography
            id="subtitle-register-interview"
            width="90%"
            textAlign="center"
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
