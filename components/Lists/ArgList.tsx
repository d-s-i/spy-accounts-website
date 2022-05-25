import { Typography, Box } from "@mui/material";
import { OrganizedArgument } from "starknet-analyzer/src/types/organizedStarknet";

import { MyList } from "./MyList";
import { MyListItem } from "./MyListItem";

import { BigNumber } from "ethers";

interface ArgListProps {
    calldata: OrganizedArgument[]
}

export const ArgList = function(props: ArgListProps) {

    const getArgsJSX = function(value: { [key: string]: any }) {
        if(value.type === "BigNumber") {
            return (
                <MyListItem>
                    <Typography sx={{ width: "250px" }} component="span" noWrap>{value.hex}</Typography>
                </MyListItem>
            );
        } else {
            return Object.entries(value).map(([_key, _value]) => {
                let value;
                if(_value.type === "BigNumber") {
                    value = BigNumber.from(_value).toHexString();
                } else {
                    value = JSON.stringify(_value);

                }
                return (
                    <MyListItem key={_key}>
                        <Typography component="span">{_key}:&nbsp;</Typography>
                        <Typography sx={{ width: "250px"}} component="span" noWrap>{value}</Typography>
                    </MyListItem>
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
                        <MyList>
                            {getArgsJSX(JSON.parse(calldata.value))}
                        </MyList>
                    </MyList>
                );
            })}
        </Box>
    );
}