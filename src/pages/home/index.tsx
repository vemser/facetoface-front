import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { useCandidate } from "../../shared/contexts";
import { ItemCandidate } from "../../shared/components";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";

export const Home: React.FC = () => {
  const [optionSelected, setOptionSelected] = useState<boolean>(true);
  const { getCandidates, candidates } = useCandidate();

  useEffect(() => {
    getCandidates();
  }, []);

  const togglePage = () => {
    if (candidates.quantidadePaginas != candidates.paginas + 1)
      getCandidates(candidates.paginas + 1, 10);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="80%"
      minHeight="100%"
      margin="0 auto"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pt="5%"
      >
        <TextField
          type="text"
          variant="outlined"
          label="Pesquisar por nome"
          sx={{ width: "45%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" alignItems="center" gap="3rem">
          <Button
            variant={optionSelected ? "contained" : "outlined"}
            sx={{ borderRadius: "100px" }}
            onClick={() => setOptionSelected(!optionSelected)}
          >
            Candidatos
          </Button>
          <Button
            variant={!optionSelected ? "contained" : "outlined"}
            sx={{ borderRadius: "100px" }}
            onClick={() => setOptionSelected(!optionSelected)}
          >
            Usuários
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <Button>teste</Button>
        <Button>teste2</Button>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Nota</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Nome</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>E-mail</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Trilha</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Gênero</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Marcar</Typography>
          </Box>
          <Box
            width="14%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Ações</Typography>
          </Box>
        </Box>
        {candidates.elementos &&
          candidates.elementos.map((item: any) => {
            return <ItemCandidate key={item.idCandidato} {...item} />;
          })}
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <Pagination
            count={candidates.quantidadePaginas}
            page={candidates.pagina}
            onChange={togglePage}
          />
        </Box>
      </Box>
    </Box>
  );
};
