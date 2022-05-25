import React from "react";
import { ArgList } from "../../Lists/ArgList";
import { CustomizedDataGrid } from "../CustomizedDataGrid";
import { GridCellParams } from "@mui/x-data-grid";

import {  FunctionCall, OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";
import {OrganizedTransactionFromBDD } from "../../../types"
import { BigNumber } from "ethers";

interface TransactionContentProps {
    organizedTransaction: OrganizedTransactionFromBDD | undefined;
}

export const TransactionContent = function(props: TransactionContentProps) {

    const [fnCalls, setFnCalls] = React.useState<{
        id: number,
        name: string,
        to: string,
        calldata: any,
    }[]>();
    const [maxArgs, setMaxArgs] = React.useState<number>(0);
    const [maxFnNameLength, setMaxFnNameLength] = React.useState<number>(0);  

    const getArgsSize = function(value: { [key: string]: any }) {
        let argsAmount = 0;
        if(value.type === "BigNumber") {
            argsAmount++;
        } else {
            Object.entries(value).map(([_key, _value]) => {
                argsAmount++;
            });
        }
        return argsAmount;
    }

    const getFnCallsData = function(functionCalls: FunctionCall[]) {
        let _maxArgs: number[] = [];
        let _maxFnNameLength: number[] = [];

        let fnCalls = [];
        let allArgs = [];
        for(const i in functionCalls) {
            _maxFnNameLength.push(functionCalls[i].name.length);
            allArgs.push(...functionCalls[i].calldata);

            const to = BigNumber.from(functionCalls[i].to._hex);
            fnCalls.push({
                id: parseFloat(i),
                name: functionCalls[i].name,
                to: to.toHexString(),
                calldata: functionCalls[i].calldata,
            });
        }

        for(const arg of allArgs) {
            _maxArgs.push(getArgsSize(JSON.parse(arg.value)));
        }

        return {
            maxArgs: Math.max(..._maxArgs),
            maxFnNameLength: Math.max(..._maxFnNameLength),
            fnCalls
        };
    }
    
    React.useEffect(() => {
        if(!props.organizedTransaction) return;
        const { 
            maxArgs: _maxArgs,
            maxFnNameLength: _maxFnNameLength,
            fnCalls: _fnCalls
        } = getFnCallsData(props.organizedTransaction.organizedFunctionCalls);

        setFnCalls(_fnCalls);
        setMaxArgs(_maxArgs)
        setMaxFnNameLength(_maxFnNameLength > 5 ? _maxFnNameLength : 5);
    }, []);
    
    return (
        <React.Fragment>
            {fnCalls && <CustomizedDataGrid 
                rowHeight={maxArgs > 1 ? (50 * maxArgs) : 100}
                columns={[
                    { field: "name", headerName: "Function", width: maxFnNameLength * 10 , sortable: false },
                    { field: "to", headerName: "To", width: 150, sortable: false },
                    { 
                        field: "calldata", 
                        headerName: "Arguments", 
                        width: 300, 
                        sortable: false, 
                        renderCell: (params: GridCellParams) => (<ArgList calldata={params.row.calldata} />),
                        flex: 1,
                    }                                                   
                ]}
                rows={fnCalls} 
            />}
        </React.Fragment>
        );
}