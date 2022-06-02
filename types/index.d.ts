import { BigNumber } from "ethers";
import React from "react";
import { FunctionCall } from "starknet-analyzer/src/types/organizedStarknet";
import { GetBlockResponse, InvokeFunctionTransaction } from "starknet-analyzer/src/types/rawStarknet";

export type NetworkName = "goerli" | "mainnet";

export interface Network {
    explorer: {
        voyager: {
            urls: {
                base: string,
                contract: string,
                transaction: string
            }
        }
    }
}

export interface StarknetDay {
    blocks?: BlocksTree,
    sortedContractsActivity?: ContractDataTree,
    organizedAccountsActivity: Required<ContractDataTree>
}

export interface ContractDataTreeFromBDD {
    [key: string]: ContractDataFromBDD
}

export interface ContractDataFromBDD { 
    transactionCount: number, 
    type: string,
    rawTransactions: InvokeFunctionTransaction[],
    organizedTransactions?: OrganizedTransactionFromBDD[]
} 

export interface OrganizedTransactionFromBDD {
    transactionHash: string,
    organizedFunctionCalls: FunctionCall[]
}

export interface OrganizedFunctionCallFromBDD {
    id: number,
    name: string,
    to: string,
    calldata: any
}

export interface CallsSummary { [key: string]: { amount: number, addresses: string[]} }

export interface FunctionCallPerAccount {
    rowSize: { height: number, width: number },
    fnCallsPerTx: OrganizedFunctionCallFromBDD[],
    transactionHash: string
}

export interface AccountState {
    address: string,
    transactionCount: number,
    organizedTransactions: OrganizedTransactionFromBDD[] | undefined,
    functionCallsPerAccount: FunctionCallPerAccount[] | undefined,
    callsSummary: CallsSummary
}