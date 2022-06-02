import { networkName, goerliObj, mainnetObj } from "./constants";

export const formatTimestamp = function(timestamp: number) {
    if(!timestamp) return "undefined";
    return (
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(timestamp)
    );
}

export const formaTimestampToDateForData = function(_timestamp: number) {
  const date = new Date(_timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const forceCast = function(value: any) {
  return value;
}

export const getNetworkObj = function(networkName: string) {
  if(networkName === "goerli") {
    return goerliObj;
  } else if(networkName === "mainnet") {
    return mainnetObj;
  } else {
    throw new Error(`_app.tsx - Wrong network name provided, only "goerli" or "mainnet" are valid values (networkName: ${networkName})`);
  }
}

export const isAddress = function(hex: string) {
  if(hex.length === 66) {
    return true;
  } else {
    return false;
  }
}