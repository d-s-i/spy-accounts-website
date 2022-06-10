import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { AccountTable } from "../../components/Tables/AccountTable/AccountTable";
import { DateTitle } from "../../components/UI/DateTitle";
import { Container, Typography } from "@mui/material";
import { MyAppBar } from "../../components/UI/MyAppBar";
import { formaTimestampToDateForData, formatTimestamp } from "../../utils";

import { BASE_URL } from "../../api/constants";

import { BigNumber } from "ethers";
import { StarknetDay } from "../../types";
import { 
  ContractDataFromBDD, 
  AccountState,
  CallsSummary
} from "../../types";
import { FunctionCall } from "starknet-analyzer/src/types/organizedStarknet";
import { forceCast } from "../../utils/index";
import { TypographyColor } from "../../utils/constants";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: TypographyColor
  },
  "& label": {
    color: TypographyColor
  },
  "& .MuiTextField-root": {
    color: TypographyColor
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: TypographyColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: TypographyColor,
    },
    '&:hover fieldset': {
      borderColor: TypographyColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: TypographyColor,
    }
  },
});

const Home: NextPage = () => {

  const router = useRouter();

  const [dateInput, setDateInput] = React.useState<string>("");
  const [timestamp, setTimestamp] = React.useState<number>(0);
  const [starknetDay, setStarknetDay] = React.useState<StarknetDay>({
    organizedAccountsActivity: []
  });
  const [accountsStates, setAccountsStates] = React.useState<AccountState[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [foundData, setFoundData] = React.useState<boolean>(false);

  React.useEffect(() => {

    console.log("router.isReady", router.isReady);
    if(!router.isReady) return;
    console.log("router.query.date", router.query.date);
    if(!router.query.date) throw new Error("No date in url");

    let _timestamp: number;
    let findExact: boolean;
    if(router.query.date === "yesterday") {
      findExact = false;
      _timestamp = Date.now();
    } else {
      findExact = true;
      _timestamp = new Date(router.query.date as string).getTime();
    }
    console.log("findExact", findExact)

    const getAndSetMostRecentStarknetDay = async function(timestamp_: number) {
      if(!timestamp_ || timestamp_ < 1653888572000) return false;
      setIsLoading(true);
      const formatedDate = formaTimestampToDateForData(timestamp_);
      console.log(`setting timestamp to ${timestamp_}`);
      setTimestamp(timestamp_);      

      const _res = await fetch(`${BASE_URL}/${formatedDate}`);
      const res = await _res.json();
      
      if(!res.data.starknetDay) getAndSetMostRecentStarknetDay(timestamp_ - 24 * 3600 * 1000);
      setStarknetDay(res.data.starknetDay);
      setIsLoading(false);
      return true;
    }

    const getAndSetExactStarknetDay = async function() {
      setIsLoading(true);
      const formatedDate = formaTimestampToDateForData(_timestamp);
      setTimestamp(_timestamp);      

      const _res = await fetch(`${BASE_URL}/${formatedDate}`);
      const res = await _res.json();
      
      setStarknetDay(res.data.starknetDay);
      setIsLoading(false);
      if(res.data.starknetDay) return true;
      return false;
    }
    
    const fetchData = async function() {
      console.log("running fetchData")
      if(findExact) {
        const _foundData = await getAndSetExactStarknetDay();   
        setFoundData(_foundData);
      } else {
        const _foundData = await getAndSetMostRecentStarknetDay(_timestamp);   
        setFoundData(_foundData);
      }
    }
    console.log("running useEffect with router.query.date")
    fetchData();
  }, [router.isReady, router.query.date]);

  React.useEffect(() => {
    if(!starknetDay?.organizedAccountsActivity) return;
    const getArgsSizes = function(value: { [key: string]: any }) {
      let argsAmount = 0;
      if(value.type === "BigNumber") {
        argsAmount++;
      } else {
        Object.entries(value).map(([_key, _value]) => {
          if(_value.type === "BigNumber") {
            argsAmount++;
          } else {
            argsAmount += getArgsSizes(_value);
          }
        });
      }
      return argsAmount;
    }
    
    const getFnCallsData = function(functionCalls: FunctionCall[], callsSummary: CallsSummary) {
      let _maxArgs: number[] = [];
      let _maxFnNameLength: number[] = [];
  
      let fnCalls = [];
      let allArgs = [];
      for(const i in functionCalls) {
        if(!callsSummary[functionCalls[i].name]) {
          callsSummary[functionCalls[i].name] = { amount: 1, addresses: [BigNumber.from(functionCalls[i].to).toHexString()] };
        } else {
          const to = BigNumber.from(functionCalls[i].to).toHexString();
          const addresses = callsSummary[functionCalls[i].name].addresses.includes(to) ? 
            callsSummary[functionCalls[i].name].addresses : [...callsSummary[functionCalls[i].name].addresses, to];
  
          callsSummary[functionCalls[i].name] = { amount: callsSummary[functionCalls[i].name].amount + 1, addresses };
        }
        _maxFnNameLength.push(functionCalls[i].name.length);
        allArgs.push(...functionCalls[i].calldata);
  
        const to = BigNumber.from(functionCalls[i].to._hex);
        fnCalls.push({
          id: parseFloat(i),
          name: functionCalls[i].name,
          to: to.toHexString(),
          calldata: functionCalls[i].calldata,
        });
      }
  
      for(const arg of allArgs) {
        _maxArgs.push(getArgsSizes(JSON.parse(arg.value)));
      }
  
      const rowHeight = Math.max(..._maxArgs) > 1 ? (45 * Math.max(..._maxArgs)) : 100;
      const rowWidth = Math.max(..._maxFnNameLength) * 10;
      
      return {
        rowSize: { width: rowWidth, height: rowHeight },
        fnCallsPerTx: fnCalls
      };
    }

    const buildAccountsState = function() {
      let _intermediaryAccountsState = [];
      for(const [address, _organizedAccount] of Object.entries(starknetDay.organizedAccountsActivity)) {            
        const organizedAccount = forceCast(_organizedAccount) as ContractDataFromBDD;
          const accountState = {
              address,
              transactionCount: organizedAccount.transactionCount,
              organizedTransactions: organizedAccount.organizedTransactions,
          };
          _intermediaryAccountsState.push(accountState);
      }
  
      let _finalAccountsState = [];
      for(const accState of _intermediaryAccountsState) {
        let callsSummary: CallsSummary = {};
        const functionCallsPerAccount = accState.organizedTransactions?.map(orgTx => {
          const { fnCallsPerTx, rowSize } = getFnCallsData(orgTx.organizedFunctionCalls, callsSummary);
  
          return {
            fnCallsPerTx, 
            rowSize, 
            transactionHash: orgTx.transactionHash
          };
        });
        _finalAccountsState.push({ ...accState, functionCallsPerAccount, callsSummary }); 
      }

      return _finalAccountsState;
    }

    const buildAndSetAccountsStates = function() {
      setIsLoading(true);
      const finalAccountsStates = buildAccountsState();
      setAccountsStates(finalAccountsStates);
      setIsLoading(false);
    }
    buildAndSetAccountsStates();

  }, [starknetDay?.organizedAccountsActivity]);
  
  return (
    <React.Fragment>
      <Head>
        <title>Spy Accounts</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <MyAppBar />
      <Container>
        {!isLoading && accountsStates.length > 0 && <DateTitle timestamp={timestamp} />} 
        {!isLoading && accountsStates.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CssTextField 
              id="outlined-basic" 
              label="Date"
              size="small" 
              placeholder="2022-05-19"
              sx={{ input: { color: TypographyColor } }} 
              onChange={(e) => setDateInput(e.target.value)}
            />
            <Button onClick={() => {
              router.push(`/${dateInput}`);
            }} color="secondary">Get Account Data</Button>
          </Box>
        )}
        {!isLoading && accountsStates.length > 0 && <AccountTable accountsStates={accountsStates} />}
        {!isLoading && !foundData && <Typography>{`No data for ${formatTimestamp(timestamp)}`}</Typography>}
        {(isLoading || (!isLoading && accountsStates.length === 0 && foundData)) && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "15%" }}>
            <Typography sx={{ marginBottom: "3%" }}>Fetching accounts data ...</Typography>
            <CircularProgress  sx={{ color: TypographyColor }} />
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Home;
