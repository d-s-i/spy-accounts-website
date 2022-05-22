import React from "react";
import type { NextPage } from "next";

import { DateTitle } from "../components/UI/DateTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { GridContainer } from "../components/UI/GridContainer";
import { GridItem } from "../components/UI/GridItem";

import { StarknetDay } from "../types";
import { BASE_URL } from "../api/constants";

const Dashboard: NextPage = () => {
  
    const [isLoading, setIsLoading] = React.useState<{ [key: string]: boolean }>({
        starknetDay: false,
        blocks: false,
        contracts: false,
        accounts: false
    });

    const [date, setDate] = React.useState<string>();
    const [starknetDay, setStarknetDay] = React.useState<StarknetDay>();
    
    React.useEffect(() => {
  
      const _date = new Date();
      const formatedDate = `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`;
      setDate(formatedDate);
  
      const URL = `${BASE_URL}/${formatedDate}`;
  
      const getAndSetStarknetDay = async function(url: string) {
        const _res = await fetch(url);
        const res = await _res.json();
  
        setStarknetDay(res.data.starknetDay);
      }
  
      getAndSetStarknetDay(URL);    
    }, [isLoading]);

    const addYesterdayStarknetDay = async function() {
        setIsLoading((prevState) => {
            return { ...prevState, starknetDay: true }
        });
        await fetch(`${BASE_URL}/yesterday`, { method: "POST" });
        setIsLoading((prevState) => {
            return { ...prevState, starknetDay: false }
        });
    }
    
    const deleteYesterdayStarknetDay = async function() {
        setIsLoading((prevState) => {
            return { ...prevState, starknetDay: true }
        });
        await fetch(`${BASE_URL}/yesterday`, { method: "DELETE" });
        setIsLoading((prevState) => {
            return { ...prevState, starknetDay: false }
        });
    }
    
  return (
    <div>
        <DateTitle date={date} />
        <div>
            <GridContainer>
                <GridItem>StarknetDay</GridItem>
                <GridItem>                        
                    {starknetDay ? "available" : "not available"}
                    {starknetDay && <LoadingButton loading={isLoading.starknetDay} onClick={deleteYesterdayStarknetDay}>Delete StarknetDay</LoadingButton>}
                    {!starknetDay && <LoadingButton loading={isLoading.starknetDay} onClick={addYesterdayStarknetDay}>Fetch StarknetDay</LoadingButton>}
                </GridItem>

                <GridItem>Blocks</GridItem>
                <GridItem>
                    {starknetDay?.blocks ? "available" : "not available"}
                    {!starknetDay?.blocks && <LoadingButton loading={isLoading.blocks}>Fetch Blocks</LoadingButton>}
                </GridItem>

                <GridItem>Contracts Activity</GridItem>
                <GridItem>
                    {starknetDay?.sortedContractsActivity ? "available" : "not available"}
                    {!starknetDay?.sortedContractsActivity && <LoadingButton loading={isLoading.contracts}>Fetch Contracts Activity</LoadingButton>}
                </GridItem>

                <GridItem>Accounts Activity</GridItem>
                <GridItem>
                    {starknetDay?.organizedAccountsActivity ? "available" : "not available"}
                    {!starknetDay?.organizedAccountsActivity && <LoadingButton loading={isLoading.accounts}>Fetch Accounts Activity</LoadingButton>}
                </GridItem>
            </GridContainer>
        </div>
    </div>
  );
}

export default Dashboard;