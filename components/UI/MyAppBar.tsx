import * as React from 'react';
import { useRouter } from "next/router";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { TypographyColor } from "../../utils/constants";

import { DappButton } from "./DappButton";

interface MyAppBarProps {
  isMainPage?: boolean
}

export const MyAppBar = (props: MyAppBarProps) => {

  const router = useRouter();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0d0d0d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <TravelExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Press Start 2P',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: TypographyColor,
                textDecoration: 'none',
              }}
            >
              Account Analyzer
            </Typography>
          </Box>
          {props.isMainPage && <DappButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};