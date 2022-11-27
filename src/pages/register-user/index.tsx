import { Avatar, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export const RegisterUser: React.FC = () => {
  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleSubmitUser = (data: any) => {
		console.log(data);
	};

  return (

    
    <Box
      display="flex"
      width="100%"
      height="100%"
      paddingTop={4}
      justifyContent="center"
      alignItems="center"
    >
      <form 
        onSubmit={handleSubmit(handleSubmitUser)}
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
      {/* ------------- Line 1 ------------------ */}
      <Box 
        display="flex" 
        width="100%" 
        alignItems="flex-start"
        mb={3}
      >
        <Avatar
          id="foto-register-candidate"
          alt="Remy Sharp"
          src=""
          sx={{ width: 60, height: 60 }}
        />
        <TextField
          id="up-foto-register-candidate"
          type="file"
          label="Foto"
          sx={{
            width: "90%",
            marginLeft: 3,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      {/* ------------- Line 2 ------------------ */}
      <Box
        display="flex"
        width="100%"
        alignItems="flex-start"
        justifyContent="center"
        gap="3rem"
        mb={3}
      >
      <TextField
						id="nome-register-user"
						label="Nome completo"
						sx={{ width: "90%" }}
						{...register("nomeCompleto")}
				/>
      <Box sx={{ width: "90%" }}>
						<FormControl>
							<FormLabel id="label-genero-register-candidate">
								Gênero
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							>
								<FormControlLabel
									id="genero-feminino-register-user"
									value="feminino"
									control={<Radio />}
									label="Feminino"
									{...register("feminino")}
								/>
								<FormControlLabel
									id="genero-masculino-register-user"
									value="masculino"
									control={<Radio />}
									label="Masculino"
									{...register("masculino")}
								/>
							</RadioGroup>
						</FormControl>
					</Box>
      </Box>

      {/* ---------------- Linha 3 ---------------*/}

      <Box
        display="flex"
        width="100%"
        alignItems="flex-start"
        gap="3rem"
        mb={3}
      >
        <TextField
						id="cidade-register-user"
						label="Cidade"
						sx={{ width: "90%" }}
						{...register("cidade")}
					/>
					<TextField
						id="estado-register-user"
						label="Estado"
						sx={{ width: "90%" }}
						{...register("estado")}
					/>

      </Box>

       {/* ---------------- Linha 3 ---------------*/}
      
      <Box
        display="flex"
        width="100%"
        alignItems="flex-start"
        gap="3rem"
        mb={3}
      >
        <TextField
						id="email-register-user"
						label="Email"
						sx={{ width: "90%" }}
						{...register("email")}
					/>
        <Box sx={{ width: "90%" }}>
						<FormControl>
							<FormLabel id="label-tipo-register-user">
								Tipo
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							>
								<FormControlLabel
									id="tipo-gestao-register-user"
									value="gestaoPessoas"
									control={<Radio />}
									label="Gestão de Pessoas"
									{...register("gestaoPessoas")}
								/>
								<FormControlLabel
									id="tipo-instutor-register-user"
									value="instrutor"
									control={<Radio />}
									label="Instrutor"
									{...register("instrutor")}
								/>
							</RadioGroup>
						</FormControl>
					</Box>

      </Box>
      
      </form>
    </Box>
  
  )
};
