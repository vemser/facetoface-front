import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth, useCandidate } from "../../shared/contexts";
import { ListCandidates } from "../../shared/components";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { useUser } from "../../shared/contexts/userContext";
import { ListUsers } from "../../shared/components/list-users";

export const Home: React.FC = () => {
  const [optionSelected, setOptionSelected] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const { getCandidates, candidates, getByName } = useCandidate();
  const { getUsers, users } = useUser();
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getCandidates();
    getUsers();
  }, []);

  const togglePage = () => {
    if (candidates.quantidadePaginas != candidates.paginas + 1)
      getCandidates(candidates.paginas + 1, 10);
  };

  const toggleSearch = () => {
    getByName(search);
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
        justifyContent={mdDown ? "center" : "space-between"}
        pt="5%"
      >
        <TextField
          type="text"
          variant="outlined"
          label="Pesquisar por nome"
          sx={{ width: `${mdDown ? "250px" : "300px"}` }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isAdmin && (
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
        )}
      </Box>
      <Box display="flex">
        <Button>teste</Button>
        <Button>teste2</Button>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        <Box display="flex" flexDirection="column" width="100%">
          {optionSelected ? <ListCandidates /> : <ListUsers />}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={3}
          mb={6}
        >
          <Pagination
            count={
              optionSelected
                ? candidates.quantidadePaginas
                : users.quantidadePaginas
            }
            page={optionSelected ? candidates.pagina : users.pagina}
            onChange={togglePage}
          />
        </Box>
      </Box>
    </Box>
  );
};
