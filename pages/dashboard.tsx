import React from "react";
import type { NextPage } from "next";

import { DateTitle } from "../components/UI/DateTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container } from "@mui/material";
import { GridContainer } from "../components/UI/GridContainer";
import { GridItem } from "../components/UI/GridItem";
import { MyAppBar } from "../components/UI/MyAppBar";

import { StarknetDay } from "../types";
import { getYesterdayFromDate } from "../utils";
import { BASE_URL } from "../api/constants";

const Dashboard: NextPage = () => {
  
    const [isLoading, setIsLoading] = React.useState<{ [key: string]: boolean }>({
        starknetDay: false,
        blocks: false,
        contracts: false,
        accounts: false
    });

    const [date, setDate] = React.useState<Date>();
    const [starknetDay, setStarknetDay] = React.useState<StarknetDay>();
    
    React.useEffect(() => {
  
      const _date = new Date();
      setDate(_date);
  
      const URL = `${BASE_URL}/${_date}`;
  
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

    const addYesterderBlocks = async function() {
        // 127.0.0.1:8000/api/v1/starknetDay/:date/blocks
        setIsLoading((prevState) => {
            return { ...prevState, blocks: true }
        });
        await fetch(`${BASE_URL}/${date}/blocks`, { method: "POST" });
        setIsLoading((prevState) => {
            return { ...prevState, blocks: false }
        });
    }

    const addYesterdaySortedContracts = async function() {
        setIsLoading((prevState) => {
            return { ...prevState, contracts: true }
        });
        await fetch(`${BASE_URL}/${date}/sortedContractsActivity`, { method: "POST" });
        setIsLoading((prevState) => {
            return { ...prevState, contracts: false }
        });
    }
    
  return (
    <React.Fragment>
        <MyAppBar />
        <Container>
            <DateTitle date={getYesterdayFromDate(date || new Date())} />
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
                        {!starknetDay?.blocks && <LoadingButton loading={isLoading.blocks} onClick={addYesterderBlocks}>Fetch Blocks</LoadingButton>}
                    </GridItem>

                    <GridItem>Contracts Activity</GridItem>
                    <GridItem>
                        {starknetDay?.sortedContractsActivity ? "available" : "not available"}
                        {!starknetDay?.sortedContractsActivity && <LoadingButton loading={isLoading.contracts} onClick={addYesterdaySortedContracts}>Fetch Contracts Activity</LoadingButton>}
                    </GridItem>

                    <GridItem>Accounts Activity</GridItem>
                    <GridItem>
                        {starknetDay?.organizedAccountsActivity ? "available" : "not available"}
                        {!starknetDay?.organizedAccountsActivity && <LoadingButton loading={isLoading.accounts} onClick={addYesterdayStarknetDay}>Fetch Accounts Activity</LoadingButton>}
                    </GridItem>
                </GridContainer>
            </div>
        </Container>
    </React.Fragment>

  );
}

export default Dashboard;