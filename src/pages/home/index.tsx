import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const [trilha, setTrilha] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { getCandidates, candidates, getByEmail, getListarPorNomeOuTrilha } =
    useCandidate();
  const { getUsers, users, getByName } = useUser();
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getCandidates();
    getUsers();
  }, []);

  const togglePage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (optionSelected) {
      getCandidates(value - 1, 10);
      setPage(value);
    } else {
      getUsers(value - 1, 10);
      setPage(value);
    }
  };

  const toggleSearch = async () => {
    setPage(1);
    optionSelected ? await getByEmail(search) : await getByName(search);
  };

  const trocaTrilha = (e: any) => {
    getListarPorNomeOuTrilha(e.target.value);
    setTrilha(e.target.value);
  };

  const resetSearch = async () => {
    setTrilha("");
    setSearch("");
    await getCandidates();
    await getUsers();
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
        flexDirection={mdDown ? "column" : "row"}
        pt="5%"
        mb={3}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: `${mdDown ? "center" : "flex-start"}`,
          }}
        >
          <TextField
            id="input-search-home"
            type={optionSelected ? "email" : "text"}
            variant="outlined"
            label={
              optionSelected ? "Pesquisar por email" : "Pesquisar por nome"
            }
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
          <Box display={optionSelected ? "flex" : "none"}>
            <FormControl
              id="input-edition-register-candidate"
              sx={{ width: "100%" }}
            >
              <InputLabel id="label-edition-register-candidate">
                Filtrar por Trilha
              </InputLabel>
              <Select
                placeholder="Filtrar por Trilha"
                id="select-edition"
                sx={{ width: `${mdDown ? "250px" : "300px"}` }}
                label="Filtrar por Trilha"
                onChange={trocaTrilha}
                value={trilha}
              >
                <MenuItem id="selected" value={"QA"}>
                  QA
                </MenuItem>
                <MenuItem id="selected" value={"FRONTEND"}>
                  FRONTEND
                </MenuItem>
                <MenuItem id="selected" value={"BACKEND"}>
                  BACKEND
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={optionSelected ? "flex" : "none"}>
            <FormControl
              id="input-edition-register-candidate"
              sx={{ width: "100%" }}
            >
              <InputLabel id="label-edition-register-candidate">
                Filtrar por Edição
              </InputLabel>
              <Select
                placeholder="Filtrar por Trilha"
                id="select-edition"
                sx={{ width: `${mdDown ? "250px" : "300px"}` }}
                label="Filtrar por Trilha"
                // onChange={trocaTrilha}
                // value={trilha}
              >
                <MenuItem id="selected" value={""} selected>
                  Selecione uma edição
                </MenuItem>
                <MenuItem id="edicao-1" value="EDICAO1">
                  1ª edição
                </MenuItem>
                <MenuItem id="edicao-2" value="EDICAO2">
                  1ª edição
                </MenuItem>
                <MenuItem id="edicao-3" value="EDICAO3">
                  3ª edição
                </MenuItem>
                <MenuItem id="edicao-4" value="EDICAO4">
                  4ª edição
                </MenuItem>
                <MenuItem id="edicao-5" value="EDICAO5">
                  5ª edição
                </MenuItem>
                <MenuItem id="edicao-6" value="EDICAO6">
                  6ª edição
                </MenuItem>
                <MenuItem id="edicao-7" value="EDICAO7">
                  7ª edição
                </MenuItem>
                <MenuItem id="edicao-8" value="EDICAO8">
                  8ª edição
                </MenuItem>
                <MenuItem id="edicao-9" value="EDICAO9">
                  9ª edição
                </MenuItem>
                <MenuItem id="edicao-10" value="EDICAO10">
                  10ª edição
                </MenuItem>
                <MenuItem id="edicao-11" value="EDICAO11">
                  11ª edição
                </MenuItem>
                <MenuItem id="edicao-12" value="EDICAO12">
                  12ª edição
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {search || trilha ? (
          <Button
            variant="outlined"
            sx={{ marginTop: `${mdDown ? "1rem" : "0"}` }}
            onClick={resetSearch}
          >
            Reset
          </Button>
        ) : (
          ""
        )}
      </Box>
      {isAdmin && (
        <Box
          display="flex"
          alignItems="center"
          gap="3rem"
          justifyContent={mdDown ? "center" : "flex-start"}
        >
          <Button
            id="button-candidates-home"
            variant={optionSelected ? "contained" : "outlined"}
            sx={{ borderRadius: "100px" }}
            onClick={() => setOptionSelected(!optionSelected)}
          >
            Candidatos
          </Button>
          <Button
            id="button-users-home"
            variant={!optionSelected ? "contained" : "outlined"}
            sx={{ borderRadius: "100px" }}
            onClick={() => setOptionSelected(!optionSelected)}
          >
            Usuários
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" width="100%" mt={3}>
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
            id="change-page-home"
            count={
              optionSelected
                ? candidates.quantidadePaginas
                : users.quantidadePaginas
            }
            page={page}
            onChange={togglePage}
          />
        </Box>
      </Box>
    </Box>
  );
};
