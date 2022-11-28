import React, { useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useCandidate } from "../../shared/contexts";

export const Home: React.FC = () => {
  const { getCandidates } = useCandidate();

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="80%"
      minHeight="100%"
      margin="0 auto"
    >
      <Box>
        <TextField type="text" variant="outlined" label="Pesquisar por nome" />
      </Box>
      <Box>
        <Button>teste</Button>
        <Button>teste2</Button>
      </Box>
      <Box></Box>
    </Box>
  );
};
