import React, { useEffect } from "react";

import { BigNumber } from "ethers";
import { ContractDataTree } from "../../../types";
import { OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";

import { CustomizedAccordion } from "../../UI/CustomizedAccordion";
import { CustomizedDataGrid } from "../CustomizedDataGrid";
import { GridCellParams } from "@mui/x-data-grid";
import { Box, Typography, Container } from "@mui/material";
import { TableFooter } from "./TableFooter";

import { MyList } from "../../Lists/MyList";
import { MyListItem } from "../../Lists/MyListItem";

interface SummaryProps {
    organizedAccountsActivity: Required<ContractDataTree>;
}

export const SummaryTable = function(props: SummaryProps) {
    
    const [accountsData, setAcountsData] = React.useState<JSX.Element[]>([]);
    const [amountToDisplay, setAmountToDisplay] = React.useState<number>(5);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const getArgsJSX = function(value: { [key: string]: any }) {
        if(value.type === "BigNumber") {
            return (
                <MyListItem>
                    <Typography sx={{ width: "250px" }} component="span" noWrap>{value.hex}</Typography>
                </MyListItem>
            );
        } else {
            return Object.entries(value).map(([_key, _value]) => {
                let value;
                if(_value.type === "BigNumber") {
                    value = BigNumber.from(_value).toHexString();
                } else {
                    value = JSON.stringify(_value);

                }
                return (
                    <MyListItem key={_key}>
                        <Typography component="span">{_key}:&nbsp;</Typography>
                        <Typography sx={{ width: "250px"}} component="span" noWrap>{value}</Typography>
                    </MyListItem>
                );
            });
        }
    }

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

    const getAccountsData = function() {
        let accountsData = Object.keys(props.organizedAccountsActivity).map((accountAddress, i) => {
            return (
                <CustomizedAccordion
                    key={accountAddress}
                    title={`${accountAddress} - ${props.organizedAccountsActivity[accountAddress].transactionCount} transactions`}
                    details={props.organizedAccountsActivity[accountAddress].organizedTransactions?.map(orgTx => {
                        let _maxArgs: number[] = [];
                        let _maxFnNameLength: number[] = [];
                        const fnCalls = orgTx.organizedFunctionCalls.map((orgFnCall, i) => {
                            const to = BigNumber.from(orgFnCall.to._hex);

                            _maxFnNameLength.push(orgFnCall.name.length);
                            orgFnCall.calldata.map(call => {
                                _maxArgs.push(getArgsSize(JSON.parse(call.value)));
                            });
                            
                            return {
                                id: i,
                                name: orgFnCall.name,
                                to: to.toHexString(),
                                calldata: orgFnCall.calldata,
                            };
                        });
                        const maxArgs = Math.max(..._maxArgs);
                        const maxFnNameLength = Math.max(..._maxFnNameLength);
                        return (
                            <CustomizedAccordion
                                key={orgTx.transactionHash}
                                title={`Hash : ${orgTx.transactionHash}`}
                                details={
                                    <CustomizedDataGrid 
                                        rowHeight={maxArgs > 1 ? (50 * maxArgs) : 100}
                                        columns={[
                                            { field: "name", headerName: "Function", width: maxFnNameLength * 10 , sortable: false },
                                            { field: "to", headerName: "To", width: 150, sortable: false },
                                            { 
                                                field: "calldata", 
                                                headerName: "Arguments", 
                                                width: 300, 
                                                sortable: false, 
                                                renderCell: (params: GridCellParams) => {
                                                    return (
                                                        <Box sx={{ display: "flex", overflow: "auto" }}>
                                                            {params.row.calldata.map((calldata: OrganizedArgument, i: number) => {
                                                                return (
                                                                    <MyList key={`${calldata.name}-${i}`} >
                                                                        <MyListItem>
                                                                            <Typography component="span">{`${calldata.name} (${calldata.type})`}</Typography>
                                                                        </MyListItem>
                                                                        <MyList>
                                                                            {getArgsJSX(JSON.parse(calldata.value))}
                                                                        </MyList>
                                                                    </MyList>
                                                                );
                                                            })}
                                                        </Box>
                                                    );
                                                },
                                                flex: 1,
                                            }                                                   
                                        ]}
                                        rows={fnCalls} 
                                    />
                                }
                            />
                        );
                    })}
                />
            );
        });
        return accountsData;
    }

    useEffect(() => {
        setIsLoading(true);

        const _accountsData = getAccountsData();
        setAcountsData(_accountsData);

        setIsLoading(false);
    }, [props.organizedAccountsActivity]);
        
    return (
        <Container sx={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Container>
                {(() => accountsData.slice(0, amountToDisplay))()}
            </Container>
            <TableFooter 
            amountToDisplay={amountToDisplay} 
                totalAmount={Object.keys(props.organizedAccountsActivity).length} 
                setAmountToDisplay={setAmountToDisplay}
            />
            {isLoading && <span>loading ...</span>}
        </Container>
    );
}