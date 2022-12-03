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
  const [search, setSearch] = useState<string | null>(null);
  const [trilha, setTrilha] = useState<string | null>(null);
  const [edicao, setEdicao] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const { getCandidates, candidates, getListarPorNomeOuTrilhaOuEdicao } =
    useCandidate();
  const { getUsers, users, getByName } = useUser();
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getCandidates();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (search) {
      optionSelected
        ? await getListarPorNomeOuTrilhaOuEdicao({
            trilha: trilha,
            edicao: edicao,
            nome: search,
          })
        : await getByName(search);
    }
  };

  const trocaTrilha = (e: any) => {
    setTrilha(e.target.value);
    getListarPorNomeOuTrilhaOuEdicao({
      trilha: e.target.value,
      edicao: edicao,
      nome: search,
    });
  };

  const trocaEdicao = (e: any) => {
    setEdicao(e.target.value);

    getListarPorNomeOuTrilhaOuEdicao({
      trilha: trilha,
      edicao: e.target.value,
      nome: search,
    });
  };

  const resetSearch = async () => {
    setTrilha(null);
    setSearch(null);
    setEdicao(null);
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
            type={optionSelected ? "text" : "text"}
            variant="outlined"
            label={"Pesquisar por nome"}
            sx={{ width: `${mdDown ? "250px" : "300px"}` }}
            value={search ? search : ""}
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
              id="input-trilha-register-candidate"
              sx={{ width: "100%" }}
            >
              <InputLabel id="label-trilha-register-candidate">
                Filtrar por Trilha
              </InputLabel>
              <Select
                placeholder="Filtrar por Trilha"
                id="select-trilha"
                sx={{ width: `${mdDown ? "250px" : "300px"}` }}
                label="Filtrar por Trilha"
                onChange={trocaTrilha}
                value={trilha ? trilha : ""}
              >
                <MenuItem id="select-qa" value={"QA"}>
                  QA
                </MenuItem>
                <MenuItem id="select-frontend" value={"FRONTEND"}>
                  FRONTEND
                </MenuItem>
                <MenuItem id="select-backend" value={"BACKEND"}>
                  BACKEND
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={optionSelected ? "flex" : "none"}>
            <FormControl
              id="input-edicao-register-candidate"
              sx={{ width: "100%" }}
            >
              <InputLabel id="label-edicao-register-candidate">
                Filtrar por Edição
              </InputLabel>
              <Select
                placeholder="Filtrar por Edição"
                id="select-edicao"
                sx={{ width: `${mdDown ? "250px" : "300px"}` }}
                label="Filtrar por Trilha"
                onChange={trocaEdicao}
                value={edicao ? edicao : ""}
              >
                <MenuItem id="edicao-1" value="1ª Edição">
                  1ª edição
                </MenuItem>
                <MenuItem id="edicao-2" value="2ª Edição">
                  1ª edição
                </MenuItem>
                <MenuItem id="edicao-3" value="3ª Edição">
                  3ª edição
                </MenuItem>
                <MenuItem id="edicao-4" value="4ª Edição">
                  4ª edição
                </MenuItem>
                <MenuItem id="edicao-5" value="5ª Edição">
                  5ª edição
                </MenuItem>
                <MenuItem id="edicao-6" value="6ª Edição">
                  6ª edição
                </MenuItem>
                <MenuItem id="edicao-7" value="7ª Edição">
                  7ª edição
                </MenuItem>
                <MenuItem id="edicao-8" value="8ª Edição">
                  8ª edição
                </MenuItem>
                <MenuItem id="edicao-9" value="9ª Edição">
                  9ª edição
                </MenuItem>
                <MenuItem id="edicao-10" value="10ª Edição">
                  10ª edição
                </MenuItem>
                <MenuItem id="edicao-11" value="11ª Edição">
                  11ª edição
                </MenuItem>
                <MenuItem id="edicao-12" value="12ª Edição">
                  12ª edição
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {search || trilha || edicao ? (
            <Button variant="outlined" onClick={resetSearch}>
              Reset
            </Button>
          ) : (
            ""
          )}
        </Box>
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
            onClick={() => setOptionSelected(true)}
          >
            Candidatos
          </Button>
          <Button
            id="button-users-home"
            variant={!optionSelected ? "contained" : "outlined"}
            sx={{ borderRadius: "100px" }}
            onClick={() => setOptionSelected(false)}
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
