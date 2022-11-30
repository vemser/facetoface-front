import {
	Box,
	Button,
	TextField,
	Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";


export const RecoverPassword: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		document.title = `Recuperação de senha`;
	}, []);

	return (
		<Box
			display="flex"
			width="100%"
			height="100vh"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			gap={10}
		>
			{/* box logo */}
			<Box
				display="flex"
				width="100%"
				flexDirection="column"
				alignItems="center"
			>
				<img
					id="logo-vem-ser-blue-recover"
					src={require("../../shared/assets/logo/vem-ser-blue.png")}
					alt="logo vem ser"
					style={{ width: "200px", marginBottom: "1rem" }}
				/>

				<Typography 
        id="texto-title-recover"
        variant="h5">Recuperação de senha</Typography>
			</Box>

			{/* box input email */}
			<Box
				display="flex"
				flexDirection="column"
				maxWidth={mdDown ? "80%" : "30%"}
				alignItems="center"
				textAlign="center"
				gap={3}
			>
				<Typography 
        id="texto-info-recover"
        variant="subtitle1">
					Informe abaixo o seu email DBC cadastrado e receba sua nova
					senha.
				</Typography>
				<TextField
           id="texto-info-recover"
					label="E-mail"
					variant="outlined"
					type="text"
					sx={{ width: "100%" }}
				></TextField>
				<Button
					id="button-recover"
					variant="contained"
					color="primary"
					sx={{ maxWidth: 150, paddingInline: 2, borderRadius: 100 }}
				>
					Enviar
				</Button>
			</Box>
		</Box>
	);
};
