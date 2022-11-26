import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import {useForm} from "react-hook-form"

export const RegisterCandidate: React.FC = () => {
	const trilha = [
		{
			value: "front-End",
			label: "Front-End",
		},
		{
			value: "back-End",
			label: "Banck-End",
		},
		{
			value: "qa",
			label: "QA",
		},
	];

  const [genero, setGenero] = React.useState({
    feminino: false,
    masculino: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenero({
      ...genero,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitCandidate = (data : any) => {
    console.log(data);
  } 
	return (

		<Box
			display="flex"
			width="100%"
			height="100%"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
		>
			<Box display="flex" width="50%" alignItems="flex-start" gap="4rem">
				<TextField
					id="nome-register-candidate"
					label="Nome completo"
					sx={{ width: "90%" }}
				/>
        <Box>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={feminino} onChange={handleChange} name="feminino" />
            }
            label="Feminino"
          />
          <FormControlLabel
            control={
              <Checkbox checked={masculino} onChange={handleChange} name="masculino" />
            }
            label="Masculino"
          />
          </FormGroup>
          </FormControl>
        </Box>
				
          
			</Box>
			<Box
				display="flex"
				width="50%"
				alignItems="flex-start"
				gap="4rem"
				mt={4}
			>
				<TextField
					id="cidade-register-candidate"
					label="Cidade"
					sx={{ width: "90%" }}
				/>
				<TextField
					id="estado-register-candidate"
					label="Estado"
					sx={{ width: "90%" }}
				/>
			</Box>
			<Box
				display="flex"
				width="50%"
				alignItems="flex-start"
				gap="4rem"
				mt={4}
			>
				<TextField
					id="nome-register-candidate"
					type="email"
					label="Linguagens de programação que você conhece"
					sx={{ width: "90%" }}
				/>
        <Box
          display="flex"
          width="50%"
          alignItems="flex-start"
          gap="4rem"
          mt={4}>
        <FormControlLabel
						id=""
						value="frontend"
						control={<Checkbox />}
						label="Front-end"
						labelPlacement="start"
					/>
					<FormControlLabel
						id=" "
						value="backend"
						control={<Checkbox  />}
						label="Back-end"
						labelPlacement="start"
					/>

            <FormControlLabel
						id=" "
						value="qa"
						control={<Checkbox/>}
						label="QA"
						labelPlacement="start"
					/>
        </Box>
				
			</Box>
		</Box>
	);
};
