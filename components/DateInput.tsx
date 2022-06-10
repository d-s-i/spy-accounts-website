import React from "react";
import { useRouter } from "next/router";

import { Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { TypographyColor } from "../utils/constants";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: TypographyColor
    },
    "& label": {
      color: TypographyColor
    },
    "& .MuiTextField-root": {
      color: TypographyColor
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: TypographyColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: TypographyColor,
      },
      '&:hover fieldset': {
        borderColor: TypographyColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: TypographyColor,
      }
    },
});

export const DateInput = function() {

    const [dateInput, setDateInput] = React.useState<string>("");
    const router = useRouter();
    
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <CssTextField 
          id="outlined-basic" 
          label="Date"
          size="small" 
          placeholder="2022-05-19"
          sx={{ input: { color: TypographyColor } }} 
          onChange={(e) => setDateInput(e.target.value)}
        />
        <Button onClick={() => {
          router.push(`/${dateInput}`);
        }} color="secondary">Get Account Data</Button>
      </Box>
    );
}