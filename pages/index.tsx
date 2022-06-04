import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Container, Typography, Box } from "@mui/material";
import { MyAppBar } from "../components/UI/MyAppBar";
import { MyList } from "../components/Lists/MyList";
import { MyListItem } from "../components/Lists/MyListItem";
import { DappButton } from "../components/UI/DappButton";

const Home: NextPage = () => {
  
  return (
    <React.Fragment>
      <Head>
        <title>Spy Accounts</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <MyAppBar isMainPage />
      <Container 
        maxWidth="lg" 
        sx={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "5%" }}
      >
        <Box>
          <Typography variant="h3" align="center" sx={{ marginBottom: "5%" }}>Welcome, truth seeker</Typography>
          <Typography gutterBottom maxWidth="1000px">Welcome to the StarkNet Decoder, where we organize and analyze on chain transactions. Explore the Dapp to see what the most active accounts are doing when you&apos;re not watching.</Typography>
          <Typography maxWidth="1000px" gutterBottom >Here, we fetch all the blocks of a day (yesterday by default), decode the transactions and show summary and details of what the most active accounts(*) did during this period.</Typography>
          <Typography sx={{ marginTop: "3%" }} variant="h6" gutterBottom>Tools are open source</Typography>
          <Typography maxWidth="1000px" gutterBottom>This website is built on top of the starknet-analyzer package, a package made to decode and organize StarkNet function calls and events.</Typography>
          <Typography maxWidth="1000px" gutterBottom>Data is fetched from my node and stored into a free mongoDB database. Please be kind if some data is missing for a day, I&apos;ll do my best to keep it updated as long as I can.</Typography>
          <Typography maxWidth="1000px" gutterBottom>Here is where you can find all the code if you want to fork it, upgrade it, or approriate it to yourself: </Typography>
          <MyList>
            <MyListItem>
              <Typography>
                <a href="https://github.com/d-s-i/starknet-analyzer" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>starknet-analyzer</a>
              </Typography>
            </MyListItem>
            <MyListItem>
              <Typography>
                <a href="https://github.com/d-s-i/spy-accounts-website" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>website</a>
              </Typography>
            </MyListItem>
            <MyListItem>
              <Typography>
                <a href="https://github.com/d-s-i/spy-accounts-api" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>organized accouns api</a>
              </Typography>
            </MyListItem>
          </MyList>
          <Box sx ={{ display: "flex", justifyContent: "center" }}>
            <DappButton />
          </Box>
        </Box>
        <Box>
          <Typography>* : a contract is interpreted as an account if he call the &apos;__execute__&apos; method</Typography>
          <Typography>** : we remove deploy transactions to keep only the invoke transactions</Typography>
        </Box>
      </Container>
      <Box sx={{ display: "flex", width: "100%", height: "5vh", marginTop: "2%", padding: "3% 20% 3% 20%", backgroundColor: "black" }}>
        <Typography>Author: dsi</Typography>
        <Typography>&nbsp;|&nbsp;</Typography>
        <Typography>Contact: <a href="https://t.me/real_dsi" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>telegram</a></Typography>
      </Box>
    </React.Fragment>
  );
}

export default Home;
