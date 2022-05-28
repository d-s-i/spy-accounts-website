import { networkName, goerliObj, mainnetObj } from "./constants";

export const formatDate = function(date: string | undefined) {
    if(!date) return "undefined";
    return (
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(Date.parse(date))
    );
}

export const getYesterdayFromDate = function(_date: Date) {
  return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate() - 1}`;
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