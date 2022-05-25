import React from "react";
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface TableFooterProps {
    amountToDisplay: number;
    totalAmount: number;
    setAmountToDisplay: React.Dispatch<React.SetStateAction<number>>
}

export const TableFooter = function(props: TableFooterProps) {

    const addAmountHandler = function() {
        props.setAmountToDisplay((prevState: number) => prevState + 1);
    }
    const removeAmountHandler = function() {
        props.setAmountToDisplay((prevState: number) => prevState - 1);
    }
    
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }}>
            <Box sx={{ width: "50%", display: "flex ", justifyContent: "flex-end" }}>
                <Typography align="center" sx={{ display: "flex", alignItems: "center" }}>
                {`${props.amountToDisplay}/${props.totalAmount}`}
                </Typography>
            </Box>
            <Box sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                {(props.amountToDisplay < props.totalAmount) && (
                    <IconButton aria-label="add" onClick={addAmountHandler}>
                        <AddIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>
                )}
                {(props.amountToDisplay >= 1) && (
                    <IconButton aria-label="remove" onClick={removeAmountHandler} >
                        <RemoveIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}