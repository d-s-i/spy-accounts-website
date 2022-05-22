import React from "react";
import { Typography } from "@mui/material"

import { formatDate } from "../../utils";

interface DateProps {
    date: string | undefined
}

export const DateTitle = function(props: DateProps) {
    return (
        <Typography fontSize="2.5em" align="center">{`Accounts Activity (${formatDate(props.date)})`}</Typography>
    );
}