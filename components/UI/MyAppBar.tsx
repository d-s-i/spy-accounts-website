import * as React from 'react';
import Link from "next/link";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { TypographyColor } from "../../utils/constants";

const pages = ["Dashboard"];

export const MyAppBar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0d0d0d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={`/${page.toLowerCase()}`}>{page}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};