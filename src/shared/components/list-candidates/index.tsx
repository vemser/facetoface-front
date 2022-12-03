import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../contexts";
import { ICandidateComplete } from "../../interfaces";
import { ItemCandidate } from "../item-candidate";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ListCandidates: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, deleteCandidate } = useCandidate();
  const [listaOrdenada, setListaOrdenada] = useState([]);
  const firtsBreakpoint = useMediaQuery("(max-width:1100px)");
  const secondBreakpoint = useMediaQuery("(max-width:800px)");

  const ordenarPorNome = () => {
    if (listaOrdenada.length === 0) {
      let lista = candidates.elementos.sort(
        (a: ICandidateComplete, b: ICandidateComplete) => {
          if (a.nomeCompleto < b.nomeCompleto) return -1;
          if (a.nomeCompleto > b.nomeCompleto) return 1;
          return 0;
        }
      );
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
          width="20%"
          onClick={ordenarPorNome}
          fontSize={firtsBreakpoint ? "13px" : "15px"}
          sx={{ cursor: "pointer" }}
          color={listaOrdenada.length > 0 ? "#1e62fe" : ""}
        >
          Nome
        </Typography>

        <Typography width="25%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          E-mail
        </Typography>

        {!secondBreakpoint && (
          <Typography width="10%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
            Trilha
          </Typography>
        )}
        <Typography width="5%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Nota
        </Typography>
        <Typography width="15%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Entrevista
        </Typography>
        <Typography width="14%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Ações
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        {listaOrdenada.length > 0
          ? listaOrdenada.map((item: ICandidateComplete) => {
              if (item.ativo !== "F")
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
                    onDetail={() => {
                      navigate("/detail-candidate/" + item.idCandidato, {
                        state: item,
                      });
                    }}
                    onInterview={() => navigate("/register-interview")}
                  />
                );
            })
          : candidates.elementos &&
            candidates.elementos?.map((item: ICandidateComplete) => {
              if (item.ativo !== "F")
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
                    onDetail={() => {
                      navigate("/detail-candidate/" + item.idCandidato, {
                        state: item,
                      });
                    }}
                    onInterview={() => navigate("/register-interview")}
                  />
                );
            })}
      </Box>
    </Box>
  );
};
