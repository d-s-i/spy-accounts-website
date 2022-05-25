import React from "react";
import { NestedList } from "../../Lists/NestedList";
import { ArgList } from "../../Lists/ArgList";
import { CustomizedDataGrid } from "../CustomizedDataGrid";
import { GridCellParams } from "@mui/x-data-grid";

import {  FunctionCall, OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";
import {OrganizedTransactionFromBDD } from "../../../types"
import { Container } from '@mui/material';
import { BigNumber } from "ethers";
import { CustomizedAccordion } from "../../UI/CustomizedAccordion";
import { TransactionContent } from "./TransactionContent";

import Button from "@mui/material/Button";
import { TypographyColor } from "../../../utils/constants";

interface TransactionTableProps {
    organizedTransactions: OrganizedTransactionFromBDD[] | undefined;
    initiallyOpen: boolean;
}

interface expandedState {
    [key: string]: {
        value: boolean, 
        setTrue: () => void, 
        setFalse: () => void
    }
}

export const TransactionTable = function(props: TransactionTableProps) {
    
    const [isAllExpanded, setIsAllExpanded] = React.useState<boolean>(props.initiallyOpen);
    const [expandedStates, setExpandedStates] = React.useState<expandedState>({});

    const expandAllHandler = function(index: number) {
        setIsAllExpanded((prevState) => {
            let valueArray = [];

            const reverseValueForIndex = function(index: number) {
                for(const i in expandedStates) {
                    // isNaN(index) =>  "Expand All" button being pressed
                    if(parseFloat(i) === index || isNaN(index)) {
                        expandedStates[i].value ? expandedStates[i].setFalse() : expandedStates[i].setTrue();
                    }
                }
            }
            
            const changeState = function(_index: number) {
                if(!prevState) {
                    reverseValueForIndex(_index);
                } else {
                    reverseValueForIndex(_index);
                }
            }
            
            for(const i in expandedStates) {
                valueArray.push(expandedStates[i].value);
            }

            let newState;
            if(prevState === false && !valueArray.includes(true)) {
                changeState(index);
                newState = true;
            } else if (prevState === true && valueArray.includes(false)) {
                changeState(index);
                newState = false;
            } else if (prevState === true && !valueArray.includes(false)) {
                changeState(index);
                newState = false;
            } else {
                if(prevState) {
                    for(const i in expandedStates) {
                        expandedStates[i].setTrue()
                    }
                    newState = true;
                } else {
                    for(const i in expandedStates) {
                        expandedStates[i].setFalse()
                    }
                    newState = false;
                }
            }

            return newState;
        });
    }

    const getButtonAction = function() {
        let valueArray = [];
        for(const i in expandedStates) {
            valueArray.push(expandedStates[i].value);
        }

        if(isAllExpanded === false && !valueArray.includes(true)) {
            return "Expand";
        } else if (isAllExpanded === true && valueArray.includes(false)) {
            return "Expand";
        } else if (isAllExpanded === true && !valueArray.includes(false)) {
            return "Expand";
        } else {
            if(isAllExpanded) {
                return "Expand";
            } else {
                return "Shrink";
            }
        }
    }

    const getExpandedState = function(settersObject: expandedState) {
        setExpandedStates((prevState) => {
            return { ...prevState, ...settersObject };
        });
    }

    return (
        <React.Fragment>
            <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => expandAllHandler(NaN)}
                    sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }}
                >
                    {`${getButtonAction()} All`}
                </Button>
            </Container>
            {props.organizedTransactions?.map((orgTx, i) => {
                return <CustomizedAccordion 
                    index={i.toString()}
                    initiallyOpen={false}
                    forceExpandAll={isAllExpanded}
                    getStateForIndex={getExpandedState}
                    onExpandAllChange={() => expandAllHandler(i)}
                    key={orgTx.transactionHash}
                    title={`Hash: ${orgTx.transactionHash}`}
                    details={<TransactionContent organizedTransaction={orgTx} />}
                />
            })}
        </React.Fragment>
    );
}