import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface ISenha {
	senha1: string
	senha2: string
}

export const ChangePassword: React.FC = () => {
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down("md"));
	const [senha, setSenha] = useState('');
	const [senhaC, setSenhaC] = useState('');

	useEffect(() => {
		document.title = `Criar nova senha`;
	}, []);

	useEffect(() => {
		console.log(senha)
		console.log(senhaC)
	}, [senha, senhaC]);

	return (
		<Box
			display="flex"
			width="100%"
			height="100vh"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			gap={5}
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

				<Typography id="texto-title-recover" variant="h5">
					Recuperação de senha
				</Typography>
			</Box>

			{/* box input email */}
			<Box
				display="flex"
				flexDirection="column"
				maxWidth={mdDown ? "80%" : "30%"}
				alignItems="center"
				textAlign="center"
				gap={2}
			>
				<Typography id="texto-info-recover" variant="subtitle1">
					Inserir nova senha.
				</Typography>
				<TextField
					id="texto-info-recover"
					label="Senha"
					variant="outlined"
					type="text"
					value={senha}
					onChange={e => setSenha(e.target.value)}
					sx={{ width: "100%" }}
				></TextField>
				<TextField
					id="texto-info-recover"
					label="Confirmar senha"
					variant="outlined"
					value={senhaC}
					type="text"
					onChange={e => setSenhaC(e.target.value)}
					sx={{ width: "100%" }}
				></TextField>
				<Button
					id="button-recover"
					variant="contained"
					color="primary"
					sx={{ width: 200, paddingInline: 2, borderRadius: 100 }}
				>
					Enviar
				</Button>
			</Box>
		</Box>
	);
};
