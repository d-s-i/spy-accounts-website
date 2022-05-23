import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface GridContainerProps {
    spacing?: number;
    boxSx?: object;
    gridSx?: object;
    children: React.ReactNode;
}

export const GridContainer = function(props: GridContainerProps) {
    return (
        <Box sx={props.boxSx}>
            <Grid 
                container 
                spacing={props.spacing || 2}
                sx={props.gridSx}
            >
                {props.children}
            </Grid>
        </Box>
    );
}