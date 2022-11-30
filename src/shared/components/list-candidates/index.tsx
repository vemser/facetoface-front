import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCandidate } from "../../contexts";
import { ICandidateComplete } from "../../interfaces";
import { ItemCandidate } from "../item-candidate";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ListCandidates: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, deleteCandidate } = useCandidate();
  const firtsBreakpoint = useMediaQuery("(max-width:1100px)");
  const secondBreakpoint = useMediaQuery("(max-width:800px)");

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        textAlign="center"
      >
        <Typography width="25%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
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

        {!firtsBreakpoint && (
          <Typography width="15%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
            Gênero
          </Typography>
        )}
        <Typography width="5%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Nota
        </Typography>
        <Typography width="15%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Entrevista
        </Typography>
        <Typography width="11%" fontSize={firtsBreakpoint ? "13px" : "15px"}>
          Ações
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        {candidates?.elementos &&
          candidates.elementos?.map((item: ICandidateComplete) => {
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
    </Box>
  );
};
