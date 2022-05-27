import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NetworkContextProvider } from "../context/network-context";
import { ThemeProvider, createTheme, responsiveFontSizes  } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

import { TypographyColor } from "../utils/constants";

let theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        color: TypographyColor
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-main > div:nth-child(2)': {
            height: 'fit-content !important',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      dark: "#0d0d0d",
      light: "#262626",
      main: "#1a1a1a",
    },
    background: {
      default: "#1a1a1a",
      paper: "#1a1a1a"
    }
  }
});
theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NetworkContextProvider>
        <Component {...pageProps} />
      </NetworkContextProvider>
    </ThemeProvider>
  );
}

export default MyApp
