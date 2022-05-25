import React from "react";
import { Typography } from "@mui/material"

import { formatDate } from "../../utils";

interface DateProps {
    date: string | undefined
}

export const DateTitle = function(props: DateProps) {
    return (
        <Typography fontSize="2.5em" align="center" sx={{ margin: "3% 0% 3% 0%" }}>{`Accounts Activity (${formatDate(props.date)})`}</Typography>
    );
}