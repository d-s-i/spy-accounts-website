import React from "react";

import { ContractDataTree } from "../../../types";

import { CustomizedAccordion } from "../../UI/CustomizedAccordion";
import { Container, Box } from "@mui/material";
import { TableFooter } from "./TableFooter";
import { SummaryTable } from "./SummaryTable";
import { UnfoldingList } from "../../Lists/UnfoldingList";
import Button from "@mui/material/Button";
import { TypographyColor } from "../../../utils/constants";

import { TransactionTable } from "./TransactionsTable";

interface AccountTableProps {
    organizedAccountsActivity: Required<ContractDataTree>;
}

interface expandedState {
    [key: string]: {
        value: boolean, 
        setTrue: () => void, 
        setFalse: () => void
    }
}

const oneLineProps = { 
    display: "flex", 
    alignItems: "flex-start"
};
const multiLineProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

export const AccountTable = function(props: AccountTableProps) {
    
    const [amountToDisplay, setAmountToDisplay] = React.useState<number>(5);
    const [expandedStates, setExpandedStates] = React.useState<expandedState>({});

    const getExpandedState = function(settersObject: expandedState) {
        setExpandedStates((prevState) => {
            return { ...prevState, ...settersObject };
        });
    }

    const expandAccordionFromKey = function(key: string) {
        if(!expandedStates[key]) {
            console.log(expandedStates);
            throw new Error(`AccountTable::expandAccordionFromKey - No value for this state (key: ${key})`);
        }
        const currValue = expandedStates[key].value;
        currValue ? expandedStates[key].setFalse() : expandedStates[key].setTrue();
    }
        
    return (
        <Container sx={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Container>
                {Object.keys(props.organizedAccountsActivity).map((accountAddress, i) => {
                    const fnCallsKey = `${accountAddress}-fn`;
                    const transactionsKey = `${accountAddress}-tx`;
                    const containerProps = (expandedStates[transactionsKey] && expandedStates[transactionsKey].value) ? multiLineProps : oneLineProps;
                    
                    return (
                        <UnfoldingList 
                            key={accountAddress}
                            title={`${accountAddress} - ${props.organizedAccountsActivity[accountAddress].transactionCount} transactions`}
                            items={[{ title: "", content: (
                                <Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            onClick={() => expandAccordionFromKey(fnCallsKey)}
                                            sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }}
                                        >
                                            {`${expandedStates[fnCallsKey] && expandedStates[fnCallsKey].value ? "Shrink" : "Expand"} Function Calls`}
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            onClick={() => expandAccordionFromKey(transactionsKey)}
                                            sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }}
                                        >
                                            {`${expandedStates[transactionsKey] && expandedStates[transactionsKey].value ? "Shrink" : "Expand"} Transactions`}
                                            
                                        </Button>
                                    </Box>
                                    <Box sx={containerProps}>
                                        <CustomizedAccordion 
                                            index={fnCallsKey}
                                            initiallyOpen
                                            title="Function Called"
                                            details={<SummaryTable organizedTransactions={props.organizedAccountsActivity[accountAddress].organizedTransactions} />}
                                            forceExpandAll={false}
                                            getStateForIndex={getExpandedState}
                                            width="50%"
                                        />
                                        <CustomizedAccordion 
                                            index={transactionsKey}
                                            initiallyOpen={false}
                                            title="Transactions"
                                            getStateForIndex={getExpandedState}
                                            details={
                                                <TransactionTable 
                                                    initiallyOpen={false}
                                                    organizedTransactions={props.organizedAccountsActivity[accountAddress].organizedTransactions} 
                                                />
                                            }
                                            forceExpandAll={false}
                                            width={(expandedStates[transactionsKey] && expandedStates[transactionsKey].value) ? "100%" : "50%"}
                                        />
                                    </Box>
                                </Box>
                            )}]}
                        />
                    );
                }).slice(0, amountToDisplay)}
            </Container>
            <TableFooter 
                amountToDisplay={amountToDisplay} 
                totalAmount={Object.keys(props.organizedAccountsActivity).length} 
                setAmountToDisplay={setAmountToDisplay}
            />
        </Container>
    );
}