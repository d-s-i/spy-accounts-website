import React from "react";
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { TypographyColor } from "../../../utils/constants";

interface TableFooterProps {
    amountToDisplay: number;
    totalAmount: number;
    setAmountToDisplay: React.Dispatch<React.SetStateAction<number>>;
    batch?: number;
}

export const TableFooter = function(props: TableFooterProps) {

    const amountToAdd = props.batch || 1;

    const addAmountHandler = function() {
        props.setAmountToDisplay((prevState: number) => prevState + amountToAdd);
    }
    const removeAmountHandler = function() {
        props.setAmountToDisplay((prevState: number) => prevState - amountToAdd);
    }
    const addAll = function() {
        props.setAmountToDisplay(props.totalAmount);
    }
    const removeAll = function() {
        props.setAmountToDisplay(amountToAdd);
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
                {(props.amountToDisplay === props.totalAmount) && (
                    <IconButton aria-label="all-all" onClick={removeAll} >
                       <DoubleArrowIcon sx={{ fontSize: "1.5em", transform: "rotate(-90deg)", color: TypographyColor }} />
                    </IconButton>
                )}
                {(props.amountToDisplay !== props.totalAmount) && (
                    <IconButton aria-label="all-all" onClick={addAll} >
                       <DoubleArrowIcon sx={{ fontSize: "1.5em", transform: "rotate(90deg)", color: TypographyColor }} />
                    </IconButton>
                )}
                {(props.amountToDisplay < props.totalAmount) && (
                    <IconButton aria-label="add" onClick={addAmountHandler}>
                        <AddIcon sx={{ fontSize: "1.5em", color: TypographyColor }} />
                    </IconButton>
                )}
                {(props.amountToDisplay >= 1) && (
                    <IconButton aria-label="remove" onClick={removeAmountHandler} >
                        <RemoveIcon sx={{ fontSize: "1.5em", color: TypographyColor }} />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}