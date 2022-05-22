// import React, { useEffect } from "react";

// import { BigNumber, BigNumberish } from "ethers";
// import { uintToBN } from "../../utils";
// import { ContractDataTree } from "../../types";
// import { OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";

// import { CustomizedAccordion } from "../UI/CustomizedAccordion";
// import { CustomizedDataGrid } from "./CustomizedDataGrid";
// import { CustomTableColumnLeft } from "./CustomTableColumnLeft";
// import { GridCellParams } from "@mui/x-data-grid";
// import { Container, Typography } from "@mui/material";
// import { Box } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// interface SummaryProps {
//     organizedAccountsActivity: Required<ContractDataTree>
// }

// export const SummaryTable = function(props: SummaryProps) {
    
//     const [amountToDisplay, setAmountToDisplay] = React.useState<number>(5);
//     const [isLoading, setIsLoading] = React.useState<boolean>(false);
//     const [accountsData, setAcountsData] = React.useState<JSX.Element[]>([]);

//     const addAmountHandler = function() {
//         setIsLoading(true);
//         setAmountToDisplay((prevState: number) => prevState + 1);
//         setIsLoading(false);
//     }
//     const removeAmountHandler = function() {
//         setIsLoading(true);
//         setAmountToDisplay((prevState: number) => prevState - 1);
//         setIsLoading(false);
//     }

//     const getAccountsData = function() {
//         let accountsData = Object.keys(props.organizedAccountsActivity).map((accountAddress, i) => {
//             return (
//                 <CustomizedAccordion
//                     key={accountAddress}
//                     title={`${accountAddress} - ${props.organizedAccountsActivity[accountAddress].transactionCount} transactions`}
//                     details={props.organizedAccountsActivity[accountAddress].organizedTransactions?.map(orgTx => {
//                         const fnCalls = orgTx.organizedFunctionCalls.map((orgFnCall, i) => {
//                             const to = BigNumber.from(orgFnCall.to._hex);
//                             return {
//                                 id: i,
//                                 name: orgFnCall.name,
//                                 to: to.toHexString(),
//                                 calldata: orgFnCall.calldata,
//                             };
//                         });
//                         return (
//                             <CustomizedAccordion
//                                 key={orgTx.transactionHash}
//                                 title={`Hash : ${orgTx.transactionHash}`}
//                                 details={
//                                     <CustomizedDataGrid 
//                                         rowHeight={30 + (30 * 10)}
//                                         columns={[
//                                             { field: "name", headerName: "Name", width: 90, sortable: false },
//                                             { field: "to", headerName: "To", width: 150, sortable: false },
//                                             { 
//                                                 field: "calldata", 
//                                                 headerName: "Arguments", 
//                                                 width: 300, 
//                                                 sortable: false, 
//                                                 renderCell: (params: GridCellParams) => {
//                                                     return fnCalls.map(fnCall => <CustomTableColumnLeft
//                                                         titles={[
//                                                             { content: "Name", align: "right" },
//                                                             { content: "Type", align: "right" },
//                                                             { content: "Arguments", align: "right" },
//                                                         ]}
//                                                         rows={[[
//                                                             { content: fnCall.name, align: "right" },
//                                                             { content: fnCall.to, align: "right" },
//                                                             { 
//                                                                 content: <CustomTableColumnLeft 
//                                                                     titles={[
//                                                                         { content: "Name", align: "right" },
//                                                                         { content: "Type", align: "right" },
//                                                                         { content: "Value", align: "right" },
//                                                                     ]}
//                                                                     rows={fnCall.calldata.map(call => [
//                                                                         { content: call.name, align: "right" },
//                                                                         { content: call.type, align: "right" },
//                                                                         { content: call.value, align: "right" },
//                                                                     ])}
//                                                                 />, 
//                                                                 align: "right" 
//                                                             },
//                                                         ]]}
//                                                     />)
//                                                     // return <CustomizedDataGrid 
//                                                     //     key={Math.random()}
//                                                     //     rowHeight={50}
//                                                     //     columns={[
//                                                     //         { field: "name", headerName: "Name", width: 90, sortable: false },
//                                                     //         { field: "type", headerName: "Type", width: 90, sortable: false },
//                                                     //         { field: "value", headerName: "Value", width: 90, sortable: false, flex: 1 },
//                                                     //     ]}
//                                                     //     rows={params.row.calldata.map((calldata: OrganizedArgument, j: number) => {
//                                                     //         let value;
//                                                     //         if(calldata.type === "Uint256") {
//                                                     //             value = uintToBN(JSON.parse(calldata.value));
//                                                     //         } else if(calldata.type === "felt") {
//                                                     //             value = BigNumber.from(JSON.parse(calldata.value)).toHexString();
//                                                     //         } else if(calldata.type === "felt*") {
//                                                     //             value = JSON.parse(calldata.value).map((val: BigNumberish) => BigNumber.from(val).toHexString()).join(",\n");
//                                                     //         } else {
//                                                     //             value = calldata.value;
//                                                     //         }
//                                                     //         return {
//                                                     //             id: j,
//                                                     //             name: calldata.name,
//                                                     //             type: calldata.type,
//                                                     //             value: value
//                                                     //         };
//                                                     //     })}
//                                                     // />;
//                                                 } ,
//                                                 flex: 1,
//                                             }                                                   
//                                         ]}
//                                         rows={fnCalls} 
//                                     />
//                                 }
//                             />
//                         );
//                     })}
//                 />
//             );
//         });
//         return accountsData;
//     }

//     useEffect(() => {
//         setIsLoading(true);

//         const _accountsData = getAccountsData();
//         setAcountsData(_accountsData);

//         setIsLoading(false);
//     }, [props.organizedAccountsActivity]);
        
//     return (
//         <React.Fragment>
//             {(() => accountsData.slice(0, amountToDisplay))()}
//             <Box sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//             }}>
//                 <Box sx={{ width: "50%", display: "flex ", justifyContent: "flex-end" }}>
//                     <Typography align="center" sx={{ display: "flex", alignItems: "center" }}>
//                         {`${amountToDisplay}/${Object.keys(props.organizedAccountsActivity).length}`}
//                     </Typography>
//                 </Box>
//                 <Box sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
//                     {(amountToDisplay <= Object.keys(props.organizedAccountsActivity).length) && <IconButton aria-label="add" onClick={addAmountHandler} >
//                         <AddIcon sx={{ fontSize: "1.5em" }} />
//                     </IconButton>}
//                     {(amountToDisplay >= 1) && <IconButton aria-label="remove" onClick={removeAmountHandler} >
//                         <RemoveIcon sx={{ fontSize: "1.5em" }} />
//                     </IconButton>}
//                 </Box>
 
//             </Box>
//             {isLoading && <span>loading ...</span>}
//         </React.Fragment>
//     );
// }

import React, { useEffect } from "react";

import { BigNumber, BigNumberish } from "ethers";
import { uintToBN } from "../../utils";
import { ContractDataTree } from "../../types";
import { OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";

import { CustomizedAccordion } from "../UI/CustomizedAccordion";
import { CustomizedDataGrid } from "./CustomizedDataGrid";
import { CustomTableColumnLeft } from "./CustomTableColumnLeft";
import { GridCellParams } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface SummaryProps {
    organizedAccountsActivity: Required<ContractDataTree>
}

export const SummaryTable = function(props: SummaryProps) {
    
    const [amountToDisplay, setAmountToDisplay] = React.useState<number>(5);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [accountsData, setAcountsData] = React.useState<JSX.Element[]>([]);

    const addAmountHandler = function() {
        setIsLoading(true);
        setAmountToDisplay((prevState: number) => prevState + 1);
        setIsLoading(false);
    }
    const removeAmountHandler = function() {
        setIsLoading(true);
        setAmountToDisplay((prevState: number) => prevState - 1);
        setIsLoading(false);
    }

    const getAccountsData = function() {
        let accountsData = Object.keys(props.organizedAccountsActivity).map((accountAddress, i) => {
            return (
                <CustomizedAccordion
                    key={accountAddress}
                    title={`${accountAddress} - ${props.organizedAccountsActivity[accountAddress].transactionCount} transactions`}
                    details={props.organizedAccountsActivity[accountAddress].organizedTransactions?.map(orgTx => {
                        const fnCalls = orgTx.organizedFunctionCalls.map((orgFnCall, i) => {
                            const to = BigNumber.from(orgFnCall.to._hex);
                            return {
                                id: i,
                                name: orgFnCall.name,
                                to: to.toHexString(),
                                calldata: orgFnCall.calldata,
                            };
                        });
                        return (
                            <CustomizedAccordion
                                key={orgTx.transactionHash}
                                title={`Hash : ${orgTx.transactionHash}`}
                                details={
                                    <CustomizedDataGrid 
                                        rowHeight={30 + (30 * 10)}
                                        columns={[
                                            { field: "name", headerName: "Name", width: 90, sortable: false },
                                            { field: "to", headerName: "To", width: 150, sortable: false },
                                            { 
                                                field: "calldata", 
                                                headerName: "Arguments", 
                                                width: 300, 
                                                sortable: false, 
                                                renderCell: (params: GridCellParams) => {
                                                    return (<CustomTableColumnLeft 
                                                        titles={[
                                                            { content: "Name", align: "right" },
                                                            { content: "Type", align: "right" },
                                                            { content: "Value", align: "right" },
                                                        ]}
                                                        rows={params.row.calldata.map((calldata: OrganizedArgument) => {
                                                            let value;
                                                            if(calldata.type === "Uint256") {
                                                                value = uintToBN(JSON.parse(calldata.value));
                                                            } else if(calldata.type === "felt") {
                                                                value = BigNumber.from(JSON.parse(calldata.value)).toHexString();
                                                            } else if(calldata.type === "felt*") {
                                                                value = JSON.parse(calldata.value).map((val: BigNumberish) => BigNumber.from(val).toHexString()).join(",\n");
                                                            } else {
                                                                value = calldata.value;
                                                            }
                                                            return [
                                                                { content: calldata.name, align: "right" },
                                                                { content: calldata.type, align: "right" },
                                                                { content: value, align: "right" },
                                                            ];
                                                        })}
                                                    />);
                                                } ,
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
        <React.Fragment>
            {(() => accountsData.slice(0, amountToDisplay))()}
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <Box sx={{ width: "50%", display: "flex ", justifyContent: "flex-end" }}>
                    <Typography align="center" sx={{ display: "flex", alignItems: "center" }}>
                        {`${amountToDisplay}/${Object.keys(props.organizedAccountsActivity).length}`}
                    </Typography>
                </Box>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    {(amountToDisplay <= Object.keys(props.organizedAccountsActivity).length) && <IconButton aria-label="add" onClick={addAmountHandler} >
                        <AddIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>}
                    {(amountToDisplay >= 1) && <IconButton aria-label="remove" onClick={removeAmountHandler} >
                        <RemoveIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>}
                </Box>
 
            </Box>
            {isLoading && <span>loading ...</span>}
        </React.Fragment>
    );
}