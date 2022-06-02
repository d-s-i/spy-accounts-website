import React from "react";
import { Typography } from "@mui/material"

import { formatTimestamp } from "../../utils";

interface DateProps {
    timestamp: number
}

export const DateTitle = function(props: DateProps) {
    return (
        <Typography fontSize="2.5em" align="center" sx={{ margin: "3% 0% 3% 0%" }}>{`Accounts Activity (${formatTimestamp(props.timestamp)})`}</Typography>
    );
}