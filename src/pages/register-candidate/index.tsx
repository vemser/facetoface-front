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
			display="flex"
			width="100%"
			flexDirection="column"
			alignItems="center"
		>
			<form
				onSubmit={handleSubmit(handleSubmitCandidate)}
				style={{
					width: "70%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				<Box display="flex" width="100%" alignItems="flex-start">
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
				<Box
					display="flex"
					width="100%"
					alignItems="flex-start"
					gap="4rem"
				>
					<TextField
						id="nome-register-candidate"
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
					</Box>
				</Box>

				<Box
					display="flex"
					width="100%"
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
					width="100%"
					alignItems="flex-start"
					gap="4rem"
					mt={4}
				>
					<TextField
						id="linguagens-register-candidate"
						type="text"
						label="Linguagens de programação que você conhece"
						sx={{ width: "100%" }}
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
									id="frontend-register-candidate"
									value="frontend"
									control={<Radio />}
									label="Front-end"
									{...register("frontend")}
								/>
								<FormControlLabel
									id="backend-register-candidate"
									value="backend"
									control={<Radio />}
									label="Back-end"
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
					</Box>
				</Box>
				<Box
					display="flex"
					width="100%"
					alignItems="flex-start"
					gap="4rem"
					mt={4}
				>
					<Box sx={{ width: "90%" }}></Box>
					<Box sx={{ width: "90%" }}>
						<Select
							labelId="demo-simple-select-label"
							id="select-edicao"
							value={edicao}
							label="Edição vem ser"
							onChange={handleChange}
							sx={{ width: "100%" }}
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
					</Box>
				</Box>
				<Box
					display="flex"
					width="100%"
					alignItems="flex-start"
					gap="4rem"
					mt={4}
				>
					<TextField
						id="up-cv-register-candidate"
						type="file"
						label="CV"
						sx={{ width: "100%" }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Box>
				<Box
					display="flex"
					width="100%"
					alignItems="flex-start"
					gap="4rem"
					mt={4}
				>
					<TextField
						id="observation-register-candidate"
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
