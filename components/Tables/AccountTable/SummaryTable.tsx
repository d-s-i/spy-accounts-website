import React from "react";

import { OrganizedTransactionFromBDD } from "../../../types";

interface SummaryTableProps {
    organizedTransactions: OrganizedTransactionFromBDD[] | undefined;
}

export const SummaryTable = function(props: SummaryTableProps) {

    const [calls, setCalls] = React.useState<{ title: string, content: string }[]>([]);

    React.useEffect(() => {
        let callsObj: { [key: string]: number } = {};
        if(!props.organizedTransactions) return;
        let calls = [];
        for(const orgTx of props.organizedTransactions) {
            calls.push(...orgTx.organizedFunctionCalls);
        }
        for(const call of calls) {
            if(!callsObj[call.name]) {
                callsObj[call.name] = 1;
            } else {
                callsObj[call.name] = callsObj[call.name] + 1;
            }
        }
        let listItems = [];
        for(const [key, value] of Object.entries(callsObj)) {
            listItems.push({ title: key, content: value.toString() });
        }
        setCalls(listItems);

    }, []);

    return (
        <React.Fragment>
            {calls.map(call => {
                return (
                    <ul key={call.title}>
                        <li>
                            {<span>{`${call.title}: ${call.content}`}</span>}
                        </li>
                    </ul>
                );
            })}
        </React.Fragment>
    );
}