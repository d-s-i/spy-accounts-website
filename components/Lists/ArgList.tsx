import { BigNumber } from "ethers";
import { useNetworkContext } from "../../context/network-context";;

import { Typography, Box } from "@mui/material";
import { OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";

import { MyList } from "./MyList";
import { MyListItem } from "./MyListItem";

import { isAddress } from "../../utils";

interface ArgListProps {
    calldata: OrganizedArgument[]
}

export const ArgList = function(props: ArgListProps) {

    const networkContext = useNetworkContext();
  
    const getArgsJSX = function(value: { [key: string]: any }) {
        if(value.type === "BigNumber") {

            if(isAddress(value.hex)) {
                console.log(`${value.hex} is an address`);
                return (
                    <MyListItem>
                        <a target="_blank" href={`${networkContext.explorer.voyager.urls.contract}/${value.hex}`} rel="noopener noreferrer">
                            <Typography sx={{ width: "250px" }} component="span" noWrap>{value.hex}</Typography>
                        </a>
                    </MyListItem>
                );
            }  else {
                console.log(`${value.hex} is not an address`);
                return (
                    <MyListItem>
                        <Typography sx={{ width: "250px" }} component="span" noWrap>{value.hex}</Typography>
                    </MyListItem>
                );
            }
            
        } else {
            return Object.entries(value).map(([_key, _value]) => {
                let value;
                if(_value.type === "BigNumber") {
                    value = BigNumber.from(_value).toHexString();
                } else {
                    value = getArgsJSX(_value);
                }
                return (
                    <MyList key={_key}>
                        <Typography component="span">{_key}:&nbsp;</Typography>
                        <Typography sx={{ width: "250px"}} component="span" noWrap>{value}</Typography>
                    </MyList>
                );
            });
        }
    }
    
    return (
        <Box sx={{ display: "flex", overflow: "auto" }}>
            {props.calldata.map((calldata: OrganizedArgument, i: number) => {
                return (
                    <MyList key={`${calldata.name}-${i}`} >
                        <MyListItem>
                            <Typography component="span">{`${calldata.name} (${calldata.type})`}</Typography>
                        </MyListItem>
                        {getArgsJSX(JSON.parse(calldata.value))}
                    </MyList>
                );
            })}
        </Box>
    );
}