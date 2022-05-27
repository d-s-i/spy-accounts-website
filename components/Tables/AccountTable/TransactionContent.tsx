import React from "react";
import { ArgList } from "../../Lists/ArgList";
import { CustomizedDataGrid } from "../CustomizedDataGrid";
import { GridCellParams } from "@mui/x-data-grid";

import { OrganizedFunctionCallFromBDD } from "../../../types"

interface TransactionContentProps {
    organizedFunctionCalls: OrganizedFunctionCallFromBDD[],
    rowHeight: number,
    rowWidth: number
}

export const TransactionContent = function(props: TransactionContentProps) {

    return (
        <CustomizedDataGrid 
            rowHeight={props.rowHeight}
            columns={[
                { field: "name", headerName: "Function", width: props.rowWidth , sortable: false },
                { field: "to", headerName: "To", width: 150, sortable: false },
                { 
                    field: "calldata", 
                    headerName: "Arguments", 
                    sortable: false, 
                    renderCell: (params: GridCellParams) => (<ArgList calldata={params.row.calldata} />),
                    flex: 1,
                }                                                   
            ]}
            rows={props.organizedFunctionCalls} 
        />
        );
}