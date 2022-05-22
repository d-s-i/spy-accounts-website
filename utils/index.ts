import { BigNumber } from "ethers";
import { Uint256 } from "starknet/dist/utils/uint256";

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

export const uintToBN = function(num: { low: BigNumber, high: BigNumber }) {
  const BN = BigNumber.from(num.low).add(BigNumber.from(num.high));
  return BN.toHexString();
}