import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../shared/schemas/register-user.schema";
import { IUser } from "../../shared/interfaces/Iuser";

export const RegisterUser: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUser>({ resolver: yupResolver(schemaUser) });

	const handleSubmitUser = (data: any) => {
		console.log(data);
	};
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box
			display="flex"
			width="100%"
			minHeight="100%"
			paddingTop={4}
			justifyContent="center"
			alignItems="center"
		>
			<form
				onSubmit={handleSubmit(handleSubmitUser)}
				style={{
					width: "70%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{/* ------------- Box 1 ------------------ */}
				<Box
					display="flex"
					flexDirection={mdDown ? "column" : "row"}
					width="100%"
					gap={3}
					alignItems="center"
					mb={3}
				>
					<Avatar
						id="foto-register-candidate"
						alt="foto"
						src=""
						sx={{ width: 100, height: 100 }}
					/>
					<TextField
						id="up-foto-register-candidate"
						type="file"
						label="Foto"
						sx={{
							width: "100%",
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Box>

				{/* ------------- Box 2 ------------------ */}
				<Box
					display="flex"
					flexDirection={mdDown ? "column" : "row"}
					width="100%"
					gap={3}
				>
					{/* ---------------- Col 1 ----------------- */}
					<Box
						display="flex"
						width="100%"
						flexDirection="column"
						gap={3}
					>
						<Box>
							<TextField
								id="name-register-user"
								label="Nome completo"
								sx={{ width: "100%" }}
								{...register("name")}
							/>
							<Typography
								id="error-name-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.name?.message}
							</Typography>
						</Box>

						<Box>
							<TextField
								id="cidade-register-user"
								label="Cidade"
								sx={{ width: "100%" }}
								{...register("city")}
							/>
							<Typography
								id="error-city-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.city?.message}
							</Typography>
						</Box>

						<Box>
							<TextField
								id="email-register-user"
								label="Email"
								sx={{ width: "100%" }}
								{...register("email")}
							/>
							<Typography
								id="error-email-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.email?.message}
							</Typography>
						</Box>
					</Box>

					{/* ---------------- Col 2 ----------------- */}
					<Box
						display="flex"
						width="100%"
						flexDirection="column"
						gap={3}
					>
						<Box>
							<Box sx={{ width: "100%", height: "56px" }}>
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
											{...register("genre")}
										/>
										<FormControlLabel
											id="genero-masculino-register-user"
											value="masculino"
											control={<Radio />}
											label="Masculino"
											{...register("genre")}
										/>
									</RadioGroup>
								</FormControl>
							</Box>
							<Typography
								id="error-genre-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.genre?.message}
							</Typography>
						</Box>

						<Box>
							<TextField
								id="estado-register-user"
								label="Estado"
								sx={{ width: "100%" }}
								{...register("state")}
							/>
							<Typography
								id="error-genre-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.state?.message}
							</Typography>
						</Box>

						<Box>
							<Box sx={{ width: "100%", height: "56px" }}>
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
											{...register("type")}
										/>
										<FormControlLabel
											id="tipo-instutor-register-user"
											value="instrutor"
											control={<Radio />}
											label="Instrutor"
											{...register("type")}
										/>
									</RadioGroup>
								</FormControl>
							</Box>
							<Typography
								id="error-type-register-user"
								variant="subtitle1"
								color="red"
								sx={{ mr: "auto" }}
							>
								{errors.type?.message}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					display="flex"
					width="100%"
					alignItems="center"
					justifyContent="center"
					paddingBottom={4}
					mt={4}
				>
					<Button
						id="button-submit-register-user"
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
