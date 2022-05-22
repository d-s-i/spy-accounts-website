import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TypographyColor } from "../../utils/constants";

interface CustomizedDataGridProps {
  rows: { id: number, name: string, to: string, calldata: any }[];
  columns: GridColDef[];
  rowHeight: number;
}

export function CustomizedDataGrid(props: CustomizedDataGridProps) {

  return (
    <span onClick={(event: any) => event.stopPropagation()} style={{ width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        sx={{ color: TypographyColor }}
        hideFooter
        headerHeight={30}
        rowHeight={props.rowHeight}
        autoHeight
      />
    </span>
  );
}