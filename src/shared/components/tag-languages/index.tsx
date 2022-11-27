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
      id={`tag-languages-register-candidate-${language}`}
      display="flex"
      gap="1rem"
      sx={{
        borderRadius: "100px",
        alignItems: "center",
        border: "1px solid #222",
        padding: "2px 15px",
        fontSize: "14px",
      }}
    >
      {language}
      <HighlightOffIcon
        id={`tag-languages-register-candidate-${language}`}
        onClick={onClick}
        sx={{ width: "18px" }}
        cursor="pointer"
      />
    </Box>
  );
};
