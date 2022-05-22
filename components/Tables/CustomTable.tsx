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

export function CustomTable(props: CustomTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.titles.map((title) => {
                return <StyledTableCell key={Math.random()} align={title.align}><Typography>{title.content}</Typography></StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => {
              return (
                <StyledTableRow key={`row-${i}`}>
                  {row.map((r, j) => {
                    return (
                        <StyledTableCell key={`${row}-${i}-${j}`} align={r.align}><Typography>{r.content}</Typography></StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
