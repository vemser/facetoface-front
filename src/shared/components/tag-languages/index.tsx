import { Box } from "@mui/system";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface IProps {
  language: string;
  onClick: any;
}

export const TagLanguages: React.FC<IProps> = ({ language, onClick }) => {
  return (
    <Box
      display="flex"
      gap="1rem"
      sx={{
        borderRadius: "100px",
        padding: "0.5rem 1rem",
        alignItems: "center",
        border: "1px solid #222",
      }}
    >
      {language}
      <HighlightOffIcon onClick={onClick} />
    </Box>
  );
};
