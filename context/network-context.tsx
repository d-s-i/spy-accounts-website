import React from "react";
import { networkName } from "../utils/constants";
import { getNetworkObj } from "../utils";
import { Network } from "../types";

const networkObj = getNetworkObj(networkName);

const NetworkContext = React.createContext<Network>(networkObj);

interface NetworkContextProps {
    children: React.ReactNode
}

export function useNetworkContext() {
    return React.useContext<Network>(NetworkContext);
}

export const NetworkContextProvider = function(props: NetworkContextProps) {
    return (
        <NetworkContext.Provider value={networkObj}>
            {props.children}
        </NetworkContext.Provider>
    );
} 