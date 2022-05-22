import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { RowProps } from "../../types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface CustomTableProps {
    titles: RowProps[];
    rows: RowProps[][]
}

export function CustomTableColumnLeft(props: CustomTableProps) {

  return (
    <TableContainer sx={{ display: "block" }} component={Paper}>
      <Table sx={{ display: "flex" }} aria-label="simple table">
        <TableRow sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}>
          {props.titles.map((title) => {
            return (
              <StyledTableCell key={Math.random()} align={title.align}>
                <Typography variant="subtitle1">{title.content}</Typography>
              </StyledTableCell>
            );
          })}
        </TableRow>
        <TableBody sx={{ display: "flex", flexGrow: 1 }}>
        {props.rows.map((row, i) => {
              return (
                <TableRow sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                    maxWidth: 200, // percentage also works
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }} key={`special-row-${i}`}>
                  {row.map((r, j) => {
                    return (
                        <StyledTableCell key={`${row}-${i}-${j}`} align={r.align}>
                          <Typography variant="subtitle1">{r.content}</Typography>
                        </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
