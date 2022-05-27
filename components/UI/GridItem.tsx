import React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface GridItemProps {
    children: React.ReactNode;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const GridItem = function(props: GridItemProps) {
    return (
        <Grid item xs={6} >
            <Item>{props.children}</Item>
        </Grid>
    );
}