import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { IUserComplete } from "../../interfaces";
import { ItemUser } from "../item-user";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ListUsers: React.FC = () => {
  const navigate = useNavigate();
  const { users, deleteUser } = useUser();
  const [listaOrdenada, setListaOrdenada] = useState([]);
  const firtsBreakpoint = useMediaQuery("(max-width:1100px)");
  const secondBreakpoint = useMediaQuery("(max-width:800px)");

  const ordenarPorNome = () => {
    if (listaOrdenada.length === 0) {
      let lista = users.elementos.sort((a: IUserComplete, b: IUserComplete) => {
        if (a.nomeCompleto < b.nomeCompleto) return -1;
        if (a.nomeCompleto > b.nomeCompleto) return 1;
        return 0;
      });
      setListaOrdenada(lista);
    } else setListaOrdenada([]);
  };

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        textAlign="center"
      >
        <Typography width="5%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Código
        </Typography>
        <Typography
          onClick={ordenarPorNome}
          width="25%"
          fontSize={firtsBreakpoint ? "13px" : "15px"}
          color={listaOrdenada.length > 0 ? "#1e62fe" : ""}
          sx={{ cursor: "pointer" }}
        >
          Nome
        </Typography>
        <Typography width="25%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          E-mail
        </Typography>
        {!secondBreakpoint && (
          <Typography width="15%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
            Gênero
          </Typography>
        )}

        <Typography width="19%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Roles
        </Typography>
        <Typography width="11%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Ações
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        {listaOrdenada.length > 0
          ? listaOrdenada.map((item: IUserComplete) => {
              if (item.ativo !== "F")
                return (
                  <ItemUser
                    key={item.idUsuario}
                    props={item}
                    onDelete={() => deleteUser(item.idUsuario)}
                    onUpdate={() =>
                      navigate("/update-user/" + item.idUsuario, {
                        state: item,
                      })
                    }
                  />
                );
            })
          : users?.elementos &&
            users.elementos?.map((item: IUserComplete) => {
              if (item.ativo !== "F")
                return (
                  <ItemUser
                    key={item.idUsuario}
                    props={item}
                    onDelete={() => deleteUser(item.idUsuario)}
                    onUpdate={() =>
                      navigate("/update-user/" + item.idUsuario, {
                        state: item,
                      })
                    }
                  />
                );
            })}
      </Box>
    </Box>
  );
};
