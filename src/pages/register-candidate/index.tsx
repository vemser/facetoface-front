import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

export const RegisterCandidate: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleSubmitCandidate = (data: any) => {
		console.log(data);
	};
	return (
		<Box
			display="flex"
			width="100%"
			height="100%"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
		>
      <form onSubmit={handleSubmit(handleSubmitCandidate)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        flexWrap: "wrap",
      }}>
			<Box display="flex" width="50%" alignItems="flex-start" gap="4rem">
				<TextField
					id="nome-register-candidate"
					label="Nome completo"
					sx={{ width: "90%" }}

          {...register("nomeCompleto")}
				/>
        
				<Box sx={{ width: "90%" }}>
					<FormControl>
						<FormLabel id="demo-row-radio-buttons-group-label">
							Gênero
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel
              id="nome-register-genero-feminino"
								value="feminino"
								control={<Radio />}
								label="Feminino"
                {...register("feminino")}
							/>
							<FormControlLabel
                id="nome-register-genero-masculino"
								value="masculino"
								control={<Radio />}
								label="Masculino"
                {...register("masculino")}
							/>
						</RadioGroup>
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
          {...register("cidade")}
				/>
				<TextField
					id="estado-register-candidate"
					label="Estado"
					sx={{ width: "90%" }}
          {...register("estado")}
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
          {...register("email")}
				/>

				<Box sx={{ width: "90%" }}>
					<FormControl>
						<FormLabel id="demo-row-radio-buttons-group-label">
							Turma escolhida
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel
								value="frontend"
								control={<Radio />}
								label="Front-end"
                {...register("frontend")}
							/>
							<FormControlLabel
								value="backend"
								control={<Radio />}
								label="Back-end"
                {...register("backend")}
							/>

							<FormControlLabel
								value="qa"
								control={<Radio />}
								label="QA"
                {...register("qa")}
							/>
						</RadioGroup>
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
					id="nome-register-edicao"
					type="email"
					label="Edição vem ser"
          
					sx={{ width: "50%" }}
          {...register("email")}
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
          multiline
          sx={{ width: "90%" }}
          label="Observações / Lembretes"
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
			</Box>
      </form>
		</Box>
	);
};
