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
import { useNavigate } from "react-router-dom";
import { ICandidateComplete } from "../../shared/interfaces";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [optionSelected, setOptionSelected] = useState<boolean>(true);
  const { getCandidates, candidates, deleteCandidate } = useCandidate();

  useEffect(() => {
    getCandidates();
  }, []);

  const togglePage = () => {
    if (candidates.quantidadePaginas != candidates.paginas + 1)
      getCandidates(candidates.paginas + 1, 10);
  };

  const styleColumns = {
    width: "14%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="90%"
      minHeight="100vh"
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
            sx={{
              width: "8%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Nota</Typography>
          </Box>
          <Box sx={styleColumns}>
            <Typography>Nome</Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography>E-mail</Typography>
          </Box>
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Trilha</Typography>
          </Box>
          <Box sx={styleColumns}>
            <Typography>Gênero</Typography>
          </Box>
          <Box sx={styleColumns}>
            <Typography>Marcar</Typography>
          </Box>
          <Box sx={styleColumns}>
            <Typography>Ações</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" width="100%" height="60vh">
          {optionSelected &&
            candidates.elementos &&
            candidates.elementos.map((item: ICandidateComplete) => {
              if (item.ativo != "F")
                return (
                  <ItemCandidate
                    key={item.idCandidato}
                    props={item}
                    onDelete={() => deleteCandidate(item.idCandidato)}
                    onUpdate={() =>
                      navigate("/update-candidate/" + item.idCandidato, {
                        state: item,
                      })
                    }
                  />
                );
            })}
        </Box>
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
