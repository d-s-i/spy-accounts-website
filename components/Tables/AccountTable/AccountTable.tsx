import React from "react";

import { 
    AccountState
} from "../../../types";

import { Container, Typography } from "@mui/material";
import { TableFooter } from "./TableFooter";
import { UnfoldingList } from "../../Lists/UnfoldingList";

import { AccountTreeView } from "./TreeView/AccountTreeView";

interface AccountTableProps {
    accountsStates: AccountState[],
}

export const AccountTable = function(props: AccountTableProps) {
    
    const [amountToDisplay, setAmountToDisplay] = React.useState<number>(5);
        
    return (
        <Container sx={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Container>
                {props.accountsStates.map(account => {
                    return (
                        <UnfoldingList 
                            key={account.address}
                            title={`${account.address} - ${account.transactionCount} transactions`}
                            items={[{ title: "", content: (
                                <AccountTreeView 
                                    accountAddress={account.address}
                                    callsSummary={account.callsSummary}
                                    functionCallsPerAccount={account.functionCallsPerAccount}
                                />
                            )}]}
                        />
                    );
                }).slice(0, amountToDisplay)}
            </Container>
            <TableFooter 
                amountToDisplay={amountToDisplay} 
                totalAmount={props.accountsStates.length} 
                setAmountToDisplay={setAmountToDisplay}
            />
        </Container>
    );
}