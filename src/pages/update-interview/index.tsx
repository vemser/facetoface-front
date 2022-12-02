import React from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { IInterview } from "../../shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaInterview } from "../../shared/schemas";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ErrorMessage } from "../../shared/components";
import { useAuth, useCandidate } from "../../shared/contexts";
import { useInterview } from "../../shared/contexts/interviewContext";
import { useLocation } from "react-router-dom";

export const UpdateInterview: React.FC = () => {
  const { state } = useLocation();
  const { updateInterview } = useInterview();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<IInterview>({
    resolver: yupResolver(schemaInterview),
    defaultValues: {
      email: state.candidatoDTO.email,
      cidade: state.candidatoDTO.cidade,
      estado: state.candidatoDTO.estado,
      nomeCompleto: state.candidatoDTO.nomeCompleto,
      observacoes: state.observacoes,
    },
  });
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  // monitora os campos
  const watchEmail = watch("email");
  const watchNome = watch("nomeCompleto");
  const watchCidade = watch("cidade");
  const watchEstado = watch("estado");
  const watchObservacoes = watch("observacoes");

  const handleSubmitInterview = (data: IInterview) => {
    let newDate = new Date(
      `${data.dateInterview}T${data.scheduleInterview}:00.000z`
    );
    let dataFinal = {
      email: user.email,
      dataEntrevista: newDate,
      cidade: data.cidade,
      estado: data.estado,
      observacoes: data.observacoes,
    };
    updateInterview(dataFinal, state.idEntrevista);
    setValue("nomeCompleto", "");
    setValue("cidade", "");
    setValue("estado", "");
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
              id="input-email-register-interview"
              label="E-mail do candidato"
              sx={{ width: "100%" }}
              {...register("email")}
              error={errors.email ? true : false}
              inputProps={{
                className: "teste",
              }}
              focused={watchEmail ? true : false}
            />
            <ErrorMessage id="error-email-register-interview" width="100%">
              {errors.email?.message}
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
              {...register("cidade")}
              error={errors.cidade ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
              focused={watchCidade ? true : false}
            />
            <ErrorMessage id="error-city-register-interview" width="100%">
              {errors.cidade?.message}
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
              id="input-candidate-register-interview"
              sx={{ width: "100%" }}
              label="Nome"
              error={errors.nomeCompleto ? true : false}
              {...register("nomeCompleto")}
              InputLabelProps={{
                shrink: true,
              }}
              focused={watchNome ? true : false}
            />
            <ErrorMessage id="error-candidate-register-interview" width="100%">
              {errors.nomeCompleto?.message}
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
              {...register("estado")}
              error={errors.estado ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
              focused={watchEstado ? true : false}
            />
            <ErrorMessage id="error-state-register-interview" width="100%">
              {errors.estado?.message}
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
            {...register("observacoes")}
            error={errors.observacoes ? true : false}
            focused={watchObservacoes ? true : false}
          />
          <ErrorMessage id="error-observation-register-interview" width="100%">
            {errors.observacoes?.message}
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
            data-testid="button-submit-testid-register-interview"
            type="submit"
            variant="contained"
            sx={{ width: "200px", height: 40, borderRadius: 100 }}
          >
            Atualizar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
